import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { serve } from '@hono/node-server';
import { db } from './db';
import { messages, users, sessions } from './db/schema';
import { createMessageSchema, registerSchema, loginSchema, type Message, type User } from 'common';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.get('/api/messages', async (c) => {
  const result = await db.select().from(messages);
  return c.json(result);
});

app.post('/api/messages', async (c) => {
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
  const body = await c.req.json();
  const parsed = registerSchema.parse(body);
  
  const existing = await db.select().from(users).where(eq(users.username, parsed.username));
  if (existing.length > 0) {
    return c.json({ error: '用户名已存在' }, 400);
  }
  
  const hashedPassword = await bcrypt.hash(parsed.password, 10);
  const result = await db.insert(users).values({
    username: parsed.username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }).returning();
  
  const user = result[0];
  const sessionId = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE).toISOString();
  
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  });
  
  setCookie(c, SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  });
  
  return c.json({ id: user.id, username: user.username, createdAt: user.createdAt } as User);
});

app.post('/api/auth/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.parse(body);
  
  const result = await db.select().from(users).where(eq(users.username, parsed.username));
  if (result.length === 0) {
    return c.json({ error: '用户名或密码错误' }, 401);
  }
  
  const user = result[0];
  const valid = await bcrypt.compare(parsed.password, user.password);
  if (!valid) {
    return c.json({ error: '用户名或密码错误' }, 401);
  }
  
  const sessionId = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE).toISOString();
  
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  });
  
  setCookie(c, SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  });
  
  return c.json({ id: user.id, username: user.username, createdAt: user.createdAt } as User);
});

app.post('/api/auth/logout', async (c) => {
  const sessionId = getCookie(c, SESSION_COOKIE);
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }
  deleteCookie(c, SESSION_COOKIE, { path: '/' });
  return c.json({ success: true });
});

app.get('/api/auth/me', async (c) => {
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

const port = 3000;
console.log(`Server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
