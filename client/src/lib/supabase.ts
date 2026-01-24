import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
