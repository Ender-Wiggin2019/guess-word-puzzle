import { GameRules } from '@/components/GameRules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Rules() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-3xl font-serif text-ink-dark">游戏规则</h1>
      </div>

      <Card className="paper-texture">
        <CardHeader>
          <CardTitle className="font-serif text-ink-dark text-lg">单人挑战模式</CardTitle>
        </CardHeader>
        <CardContent>
          <GameRules />
        </CardContent>
      </Card>
    </div>
  );
}
