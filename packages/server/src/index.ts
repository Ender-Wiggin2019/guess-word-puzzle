import { Hono, type Context } from 'hono';
import { cors } from 'hono/cors';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { getDb, type AppEnv } from './db';
import { messages, users, sessions, challengeResults } from './db/schema';
import { createMessageSchema, registerSchema, loginSchema, type Message, type User, type Difficulty } from 'common';
import { eq, desc, sql, and } from 'drizzle-orm';
import { hashPassword, verifyPassword, generateSessionId } from './crypto';

const app = new Hono<AppEnv>();

app.use('*', cors({
  origin: (origin) => {
    const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  credentials: true,
}));

app.use('*', async (c, next) => {
  c.set('db', getDb(c.env.DB));
  await next();
});

app.get('/api/messages', async (c) => {
  const db = c.get('db');
  const result = await db.select().from(messages);
  return c.json(result);
});

app.post('/api/messages', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const parsed = createMessageSchema.parse(body);
  const result = await db.insert(messages).values({
    content: parsed.content,
    createdAt: new Date().toISOString(),
  }).returning();
  return c.json(result[0] as Message);
});

const SESSION_COOKIE = 'session_id';
const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

app.post('/api/auth/register', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const parsed = registerSchema.parse(body);
  
  const existing = await db.select().from(users).where(eq(users.username, parsed.username));
  if (existing.length > 0) {
    return c.json({ error: '用户名已存在' }, 400);
  }
  
  const hashedPassword = await hashPassword(parsed.password);
  const result = await db.insert(users).values({
    username: parsed.username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }).returning();
  
  const user = result[0];
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE).toISOString();
  
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  });
  
  setCookie(c, SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  });
  
  return c.json({ id: user.id, username: user.username, createdAt: user.createdAt } as User);
});

app.post('/api/auth/login', async (c) => {
  const db = c.get('db');
  const body = await c.req.json();
  const parsed = loginSchema.parse(body);
  
  const result = await db.select().from(users).where(eq(users.username, parsed.username));
  if (result.length === 0) {
    return c.json({ error: '用户名或密码错误' }, 401);
  }
  
  const user = result[0];
  const valid = await verifyPassword(parsed.password, user.password);
  if (!valid) {
    return c.json({ error: '用户名或密码错误' }, 401);
  }
  
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE).toISOString();
  
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  });
  
  setCookie(c, SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  });
  
  return c.json({ id: user.id, username: user.username, createdAt: user.createdAt } as User);
});

app.post('/api/auth/logout', async (c) => {
  const db = c.get('db');
  const sessionId = getCookie(c, SESSION_COOKIE);
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }
  deleteCookie(c, SESSION_COOKIE, { path: '/' });
  return c.json({ success: true });
});

app.get('/api/auth/me', async (c) => {
  const db = c.get('db');
  const sessionId = getCookie(c, SESSION_COOKIE);
  if (!sessionId) {
    return c.json({ error: '未登录' }, 401);
  }
  
  const sessionResult = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  if (sessionResult.length === 0) {
    deleteCookie(c, SESSION_COOKIE, { path: '/' });
    return c.json({ error: '会话已过期' }, 401);
  }
  
  const session = sessionResult[0];
  if (new Date(session.expiresAt) < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    deleteCookie(c, SESSION_COOKIE, { path: '/' });
    return c.json({ error: '会话已过期' }, 401);
  }
  
  const userResult = await db.select().from(users).where(eq(users.id, session.userId));
  if (userResult.length === 0) {
    return c.json({ error: '用户不存在' }, 401);
  }
  
  const user = userResult[0];
  return c.json({ id: user.id, username: user.username, createdAt: user.createdAt } as User);
});

async function getCurrentUser(c: Context<AppEnv>): Promise<{ id: number; username: string } | null> {
  const db = c.get('db');
  const sessionId = getCookie(c, SESSION_COOKIE);
  if (!sessionId) return null;
  
  const sessionResult = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  if (sessionResult.length === 0) return null;
  
  const session = sessionResult[0];
  if (new Date(session.expiresAt) < new Date()) return null;
  
  const userResult = await db.select().from(users).where(eq(users.id, session.userId));
  if (userResult.length === 0) return null;
  
  const user = userResult[0];
  return { id: user.id, username: user.username };
}

app.post('/api/challenge-results', async (c) => {
  const user = await getCurrentUser(c);
  if (!user) {
    return c.json({ error: '未登录' }, 401);
  }
  
  const db = c.get('db');
  const body = await c.req.json();
  const { challengeId, time, score, difficulty } = body as { 
    challengeId: string; 
    time: number; 
    score: number;
    difficulty: Difficulty;
  };
  
  const existing = await db.select()
    .from(challengeResults)
    .where(and(
      eq(challengeResults.userId, user.id),
      eq(challengeResults.challengeId, challengeId)
    ));
  
  if (existing.length > 0) {
    const prev = existing[0];
    if (score > prev.score || (score === prev.score && time < prev.time)) {
      await db.update(challengeResults)
        .set({ score, time, difficulty, completedAt: new Date().toISOString() })
        .where(eq(challengeResults.id, prev.id));
    }
  } else {
    await db.insert(challengeResults).values({
      userId: user.id,
      challengeId,
      score,
      time,
      difficulty,
      completedAt: new Date().toISOString(),
    });
  }
  
  return c.json({ success: true });
});

app.get('/api/daily-leaderboard/:challengeId', async (c) => {
  const db = c.get('db');
  const challengeId = c.req.param('challengeId');
  
  const results = await db
    .select({
      userId: challengeResults.userId,
      username: users.username,
      score: challengeResults.score,
      time: challengeResults.time,
      difficulty: challengeResults.difficulty,
      completedAt: challengeResults.completedAt,
    })
    .from(challengeResults)
    .innerJoin(users, eq(challengeResults.userId, users.id))
    .where(eq(challengeResults.challengeId, challengeId))
    .orderBy(desc(challengeResults.score), sql`time ASC`);
  
  const leaderboard = results.map((r, index) => ({
    rank: index + 1,
    ...r,
  }));
  
  return c.json(leaderboard);
});

app.get('/api/total-leaderboard', async (c) => {
  const db = c.get('db');
  
  const results = await db
    .select({
      userId: challengeResults.userId,
      username: users.username,
      totalScore: sql<number>`SUM(${challengeResults.score})`,
      completedChallenges: sql<number>`COUNT(DISTINCT ${challengeResults.challengeId})`,
    })
    .from(challengeResults)
    .innerJoin(users, eq(challengeResults.userId, users.id))
    .groupBy(challengeResults.userId, users.username)
    .orderBy(sql`SUM(${challengeResults.score}) DESC`);
  
  const leaderboard = results.map((r, index) => ({
    rank: index + 1,
    ...r,
  }));
  
  return c.json(leaderboard);
});

app.get('/api/my-results', async (c) => {
  const user = await getCurrentUser(c);
  if (!user) {
    return c.json({ error: '未登录' }, 401);
  }
  
  const db = c.get('db');
  const results = await db
    .select({
      challengeId: challengeResults.challengeId,
      score: challengeResults.score,
      time: challengeResults.time,
      completedAt: challengeResults.completedAt,
    })
    .from(challengeResults)
    .where(eq(challengeResults.userId, user.id));
  
  return c.json(results);
});

export default app;
