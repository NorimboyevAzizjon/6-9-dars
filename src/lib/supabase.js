import { createClient } from '@supabase/supabase-js';

// Quyidagilarni o'zingizning Supabase loyihangizdan oling!
const supabaseUrl = 'https://abcd1234.supabase.co'; // <-- bu yerga haqiqiy URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // <-- bu yerga haqiqiy anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
