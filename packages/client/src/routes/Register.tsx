import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const register = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('两次密码不一致');
      return;
    }
    register.mutate(
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
          <CardTitle className="font-serif text-2xl">注册</CardTitle>
          <p className="text-sm text-muted-foreground">
            创建账号，开启猜词之旅
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
                placeholder="2-20个字符"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少6个字符"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                required
              />
            </div>
            {register.isError && (
              <p className="text-sm text-vermilion">
                {register.error?.message || '注册失败'}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={register.isPending}
            >
              {register.isPending ? '注册中...' : '注册'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            已有账号？{' '}
            <Link to="/login" className="text-cyan hover:underline">
              立即登录
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
