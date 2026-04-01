import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zuwjsujwitddizdidevg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1rBQlkv8C6vku4_H-rzh2Q_rOUUusLG';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type { Database };
