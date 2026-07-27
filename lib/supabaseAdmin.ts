import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createClient(url, key, { auth: { persistSession: false } });
}

export function checkPassword(password: string): boolean {
  return password === (process.env.SOLENA_ADMIN_PASSWORD || "solena2024");
}
