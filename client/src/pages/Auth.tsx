import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Lock, ArrowLeft, MessageCircle } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError('メールアドレスまたはパスワードが正しくありません');
      } else {
        setLocation('/mypage');
      }
    } catch {
      setError('エラーが発生しました。もう一度お試しください');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>トップページに戻る</span>
        </a>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <img
                src="/logo_toumei.png"
                alt="LinCal"
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold">マイページログイン</CardTitle>
            <CardDescription>ご契約中のお客様専用ログイン</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="6文字以上"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full glow-btn text-white font-semibold py-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    処理中...
                  </>
                ) : (
                  'ログイン'
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground text-center">
              <p className="font-semibold text-foreground mb-1">初めての方へ</p>
              <p className="text-xs sm:text-sm">
                ご契約前の方は、まずLINEでお問い合わせください。
                <br />
                契約後にログイン情報をお送りします。
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => window.open('https://lin.ee/tH2mCjG', '_blank')}
              >
                <MessageCircle className="w-4 h-4" />
                LINEでお問い合わせ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
