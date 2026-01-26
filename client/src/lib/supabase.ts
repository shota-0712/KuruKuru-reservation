import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!isSupabaseConfigured) {
  console.error(
    "CRITICAL ERROR: Supabase environment variables are missing.\n" +
    "Please check your .env file locally or GitHub Secrets in production.\n" +
    "Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
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
