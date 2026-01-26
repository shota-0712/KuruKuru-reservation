import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  LogOut,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Loader2,
  User,
  Building2,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { ProfileEditDialog } from '@/components/ProfileEditDialog';

const PLANS = [
  {
    id: 'standard',
    name: 'スタンダード',
    price: '1,980',
    description: '同時刻に1名様の予約を受付',
    features: ['LINE予約・通知機能', 'Googleカレンダー連携', 'チャット機能（追加0円）'],
  },
  {
    id: 'business',
    name: 'ビジネス',
    price: '4,980',
    description: '同時刻に複数名の予約を受付',
    features: ['スタンダードの全機能', '定員数に合わせた在庫管理', '複数枠の予約管理'],
  },
  {
    id: 'pro',
    name: 'プロ',
    price: '6,980',
    description: 'スタッフごとの指名予約対応',
    features: ['ビジネスの全機能', 'スタッフ別カレンダー連携', '個別のシフト管理'],
  },
];

export default function MyPage() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const [, setLocation] = useLocation();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/auth');
    }
  }, [user, loading, setLocation]);

  // Stripeチェックアウトセッションを作成
  const handleSubscribe = async (planId: string) => {
    setCheckoutLoading(planId);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId: user?.id }),
      });
      const { url, error } = await response.json();
      if (error) {
        alert('エラーが発生しました: ' + error);
      } else if (url) {
        window.location.href = url;
      }
    } catch {
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      setCheckoutLoading(null);
    }
  };

  // Stripeカスタマーポータルを開く
  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      const { url, error } = await response.json();
      if (error) {
        alert('エラーが発生しました: ' + error);
      } else if (url) {
        window.location.href = url;
      }
    } catch {
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  // URLパラメータでStripeからの戻りを検知
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      // 支払い成功時はプロフィールを更新
      refreshProfile();
      // URLをクリーン
      window.history.replaceState({}, '', '/mypage');
    }
  }, [refreshProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const subscriptionStatus = profile?.subscription_status || 'none';
  const currentPlan = profile?.subscription_plan;

  const getStatusBadge = () => {
    switch (subscriptionStatus) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            契約中
          </Badge>
        );
      case 'past_due':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            支払い遅延
          </Badge>
        );
      case 'canceled':
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            <Clock className="w-3 h-3 mr-1" />
            解約済み
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            未契約
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo_toumei.png" alt="LinCal" className="h-10 w-auto" />
          </a>
          <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            ログアウト
          </Button>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>トップページに戻る</span>
        </a>

        <h1 className="text-2xl sm:text-3xl font-bold mb-8">マイページ</h1>

        {/* Account Info */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>アカウント情報</span>
                <ProfileEditDialog
                  currentFullName={profile?.full_name || ''}
                  currentCompanyName={profile?.company_name || ''}
                  onSuccess={refreshProfile}
                />
              </div>
              {getStatusBadge()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">お名前</p>
                  <p className="font-medium">{profile?.full_name || '未設定'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">店舗名・会社名</p>
                  <p className="font-medium">{profile?.company_name || '未設定'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg sm:col-span-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">メールアドレス</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>

            {subscriptionStatus === 'active' && currentPlan && (
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">現在のプラン</p>
                    <p className="text-lg font-bold text-primary">
                      {PLANS.find(p => p.id === currentPlan)?.name}プラン
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        契約管理
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plans */}
        {subscriptionStatus !== 'active' && (
          <>
            <h2 className="text-xl font-bold mb-4">プランを選択</h2>
            <p className="text-muted-foreground mb-6">
              ご希望のプランを選択して、Stripeで安全にお支払いください。
              <br />
              <span className="text-sm">※ 初期費用 19,800円（税込）が別途かかります</span>
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <Card
                  key={plan.id}
                  className={`border-0 shadow-lg transition-all hover:shadow-xl ${currentPlan === plan.id ? 'ring-2 ring-primary' : ''
                    }`}
                >
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">¥{plan.price}</span>
                      <span className="text-muted-foreground">/月</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full glow-btn text-white"
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={checkoutLoading !== null}
                    >
                      {checkoutLoading === plan.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          このプランで契約
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">ご不明な点がありましたら</strong>
                <br />
                プラン選択やシステムについてご質問がある場合は、
                <a
                  href="https://lin.ee/tH2mCjG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  LINE公式アカウント
                </a>
                からお気軽にお問い合わせください。
              </p>
            </div>
          </>
        )}

        {/* Active subscription info */}
        {subscriptionStatus === 'active' && (
          <Card className="border-0 shadow-lg bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ご契約ありがとうございます</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    LinCalのセットアップについては、担当者よりご連絡いたします。
                    <br />
                    ご不明な点がございましたら、LINEよりお問い合わせください。
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://lin.ee/tH2mCjG", "_blank")}
                  >
                    LINEでお問い合わせ
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
