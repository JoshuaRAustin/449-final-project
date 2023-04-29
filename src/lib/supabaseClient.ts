import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://owulsfnmfkoftzjjzkpu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dWxzZm5tZmtvZnR6amp6a3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI3OTE5MzksImV4cCI6MTk5ODM2NzkzOX0.EUrnhnAygN_K1d_mgnc4G0jQXZe5WKitIqa5XihG_FI";
export const supabase = createClient(supabaseUrl, supabaseKey);

