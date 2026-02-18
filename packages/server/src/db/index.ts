import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type AppEnv = {
  Bindings: {
    DB: D1Database;
    ENV: 'development' | 'production';
    ALLOWED_ORIGINS: string;
  };
  Variables: {
    db: ReturnType<typeof getDb>;
  };
};
