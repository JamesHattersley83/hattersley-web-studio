import { Sidebar } from "@/components/Sidebar";
import { requireUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/SetupNotice";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar userEmail={user?.email} />
      <main className="min-w-0 flex-1 bg-canvas">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
