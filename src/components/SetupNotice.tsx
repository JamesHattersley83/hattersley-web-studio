export function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="card max-w-xl p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-amber-bg font-heading text-lg font-bold text-status-amber">
          H
        </span>
        <h1 className="mt-4 font-heading text-xl font-bold text-navy">
          Finish Supabase setup
        </h1>
        <p className="mt-2 text-sm text-muted">
          The CRM is running, but it isn&apos;t connected to Supabase yet. To
          bring it online:
        </p>
        <ol className="mt-4 space-y-3 text-sm text-navy">
          <li>
            <span className="font-semibold">1.</span> Run{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">
              supabase/migrations/0001_init.sql
            </code>{" "}
            then{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">
              supabase/seed.sql
            </code>{" "}
            in the Supabase SQL editor.
          </li>
          <li>
            <span className="font-semibold">2.</span> Create a single Auth user
            (Authentication → Users → Add user) with your email and a password.
          </li>
          <li>
            <span className="font-semibold">3.</span> Copy{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">
              .env.local.example
            </code>{" "}
            to{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">
              .env.local
            </code>{" "}
            and fill in your project URL and keys.
          </li>
          <li>
            <span className="font-semibold">4.</span> Restart the dev server.
          </li>
        </ol>
        <p className="mt-5 text-xs text-muted">
          Full details are in <span className="font-semibold">README.md</span>.
        </p>
      </div>
    </div>
  );
}
