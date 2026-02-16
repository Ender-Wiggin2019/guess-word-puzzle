import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';
import { useMessages, useCreateMessage } from '@/hooks/useMessages';
import { useState } from 'react';

export default function Home() {
  const { count, increment, decrement } = useAppStore();
  const { data: messages, isLoading } = useMessages();
  const createMessage = useCreateMessage();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      createMessage.mutate({ content: input });
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-semibold tracking-tight text-ink-dark">
            墨韵猜词
          </h1>
          <p className="text-cyan text-lg">
            以字会友，以词传情
          </p>
        </header>
        
        <Card className="border-none ink-shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">状态计数</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-8">
            <Button variant="outline" onClick={decrement} className="w-10 h-10 p-0">
              −
            </Button>
            <span className="text-3xl font-serif text-ink-dark min-w-[3rem] text-center">
              {count}
            </span>
            <Button onClick={increment} className="w-10 h-10 p-0">
              +
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none ink-shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">留言板</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="写下你的想法..."
                className="flex-1"
              />
              <Button type="submit">发送</Button>
            </form>
            
            {isLoading ? (
              <p className="text-muted-foreground text-center py-4">加载中...</p>
            ) : (
              <ul className="space-y-3">
                {messages?.map((msg) => (
                  <li 
                    key={msg.id} 
                    className="p-3 bg-muted/50 rounded-sm text-ink-medium"
                  >
                    {msg.content}
                  </li>
                ))}
                {messages?.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    暂无留言，来写第一条吧
                  </p>
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        <footer className="text-center pt-8">
          <p className="text-sm text-cyan-light">
            留白之美，尽在不言中
          </p>
        </footer>
      </div>
    </div>
  );
}
