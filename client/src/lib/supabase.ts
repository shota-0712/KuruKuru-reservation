import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

console.log('[Supabase Config] URL:', supabaseUrl);
console.log('[Supabase Config] Key prefix:', supabaseAnonKey?.substring(0, 15) + '...');
console.log('[Supabase Config] Key length:', supabaseAnonKey?.length);

if (!isSupabaseConfigured) {
  console.error(
    "CRITICAL ERROR: Supabase environment variables are missing.\n" +
    "Please check your .env file locally or GitHub Secrets in production.\n" +
    "Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY"
  );
}

const customFetch = async (url: string, options: any) => {
  const timeout = 10000; // 10秒
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  console.log(`[Supabase Fetch] Request: ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    console.log(`[Supabase Fetch] Response: ${response.status} ${response.statusText}`);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    console.error(`[Supabase Fetch] Error:`, error);
    if (error.name === 'AbortError') {
      console.error('[Supabase Fetch] Request timed out after 10s');
    }
    throw error;
  }
};

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    global: {
      fetch: customFetch as any,
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);

// 型定義
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  stripe_customer_id: string | null;
  setup_fee_paid: boolean;
  subscription_status: 'none' | 'active' | 'canceled' | 'past_due';
  subscription_plan: 'standard' | 'business' | 'pro' | null;
  created_at: string;
  updated_at: string;
};
