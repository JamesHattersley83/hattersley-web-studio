import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/env";

/**
 * Require an authenticated user in a Server Component. Redirects to /login
 * when signed out. Returns null when Supabase isn't configured (the page
 * should then render setup guidance).
 */
export async function requireUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}
