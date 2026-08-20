import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Flips any 'sent' invoice past its due date to 'overdue'.
 * Point a scheduler (e.g. Vercel Cron or pg_cron) at this route daily.
 * Requires SUPABASE_SERVICE_ROLE_KEY.
 */
export async function POST() {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("mark_overdue_invoices");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ updated: data ?? 0 });
}

export const GET = POST;
