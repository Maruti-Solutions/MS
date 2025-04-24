import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 