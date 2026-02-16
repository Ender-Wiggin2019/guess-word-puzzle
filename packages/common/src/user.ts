import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.string(),
});

export const registerSchema = z.object({
  username: z.string().min(2, '用户名至少2个字符').max(20, '用户名最多20个字符'),
  password: z.string().min(6, '密码至少6个字符'),
});

export const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

export type User = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
