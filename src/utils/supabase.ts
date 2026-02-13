import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Đây là client duy nhất (Singleton) dùng để giao tiếp với DB
export const supabase = createClient(supabaseUrl, supabaseKey);