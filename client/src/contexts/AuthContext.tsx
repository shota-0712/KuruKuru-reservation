import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, companyName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // プロフィール取得
  const fetchProfile = async (userId: string) => {
    try {
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const timeoutPromise = new Promise<{ data: null; error: { message: string } } | { data: Profile; error: null }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: { message: 'Profile fetch timed out' } }), 5000)
      );

      // @ts-ignore - Promise race types are tricky with Supabase response
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data as Profile;
    } catch (err) {
      console.error('Unexpected error in fetchProfile:', err);
      return null;
    }
  };

  // プロフィールリフレッシュ
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    console.log('[Auth] Initializing...');

    // Safety timeout: stop loading after 5 seconds even if something hangs
    const safetyTimeout = setTimeout(() => {
      console.warn('[Auth] Safety timeout reached - forcing loading=false');
      setLoading(false);
    }, 5000);

    // 初回セッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] getSession result:', session ? 'Session found' : 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('[Auth] Fetching profile for user:', session.user.id);
        fetchProfile(session.user.id).then((profile) => {
          console.log('[Auth] Profile fetched:', profile ? 'Success' : 'Null');
          setProfile(profile);
        });
      }
      setLoading(false);
      clearTimeout(safetyTimeout);
    }).catch(err => {
      console.error('[Auth] getSession error:', err);
      setLoading(false);
      clearTimeout(safetyTimeout);
    });

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('[Auth] Fetching profile (on change)...');
          const profileData = await fetchProfile(session.user.id);
          console.log('[Auth] Profile fetched (on change):', profileData ? 'Success' : 'Null');
          setProfile(profileData);
        } else {
          setProfile(null);
        }
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // 新規登録
  const signUp = async (email: string, password: string, fullName: string, companyName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName || null,
        },
      },
    });

    if (error) {
      return { error };
    }

    // プロフィールはSupabaseのトリガーで自動作成される想定
    // 手動で作成する場合は以下を有効化
    /*
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
        company_name: companyName || null,
      });
    }
    */

    return { error: null };
  };

  // ログイン
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error as Error | null };
  };

  // ログアウト
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
