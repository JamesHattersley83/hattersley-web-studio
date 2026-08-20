import { LoginForm } from "@/components/forms/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/SetupNotice";

export default function LoginPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy font-heading text-lg font-bold text-white">
            H
          </span>
          <h1 className="mt-4 font-heading text-xl font-bold text-navy">
            Hattersley Studio CRM
          </h1>
          <p className="mt-1 text-sm text-muted">Sign in to continue</p>
        </div>
        <div className="card p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
