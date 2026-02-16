import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border-none ink-shadow-md">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="font-serif text-2xl">登录</CardTitle>
          <p className="text-sm text-muted-foreground">
            登录后开始猜词之旅
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
            {login.isError && (
              <p className="text-sm text-vermilion">
                {login.error?.message || '登录失败'}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={login.isPending}
            >
              {login.isPending ? '登录中...' : '登录'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            还没有账号？{' '}
            <Link to="/register" className="text-cyan hover:underline">
              立即注册
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
