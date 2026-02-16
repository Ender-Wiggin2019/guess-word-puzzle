import { Link, useNavigate } from 'react-router-dom';
import { useUser, useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { data: user, isLoading } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-trace/50">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-ink-dark hover:text-cyan transition-colors">
          墨韵猜词
        </Link>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-20 bg-muted animate-pulse rounded-sm" />
          ) : user ? (
            <>
              <span className="text-sm text-ink-light">
                {user.username}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                退出
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  登录
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  注册
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
