import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MyPage from "./pages/MyPage";
import Legal from "./pages/Legal";


import { isSupabaseConfigured } from "@/lib/supabase";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/auth"} component={Auth} />
      <Route path={"/mypage"} component={MyPage} />
      <Route path={"/legal"} component={Legal} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">設定エラー</h1>
          <p className="text-gray-700 mb-4">
            必要な環境変数が不足しているため、アプリケーションを開始できません。
          </p>
          <div className="bg-gray-100 p-4 rounded text-sm font-mono text-gray-600 overflow-x-auto">
            <p>設定が必要な変数:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_ANON_KEY</li>
            </ul>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            .envファイルまたはデプロイ設定を確認してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
