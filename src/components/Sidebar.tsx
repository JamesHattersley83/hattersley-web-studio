"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  InvoiceIcon,
  LeadsIcon,
  ProjectsIcon,
  TimeIcon,
} from "./icons";

const NAV = [
  { href: "/", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/leads", label: "Leads", icon: LeadsIcon },
  { href: "/projects", label: "Projects", icon: ProjectsIcon },
  { href: "/time", label: "Time Log", icon: TimeIcon },
  { href: "/invoices", label: "Invoices", icon: InvoiceIcon },
];

export function Sidebar({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-navy text-white">
      <div className="px-5 pb-6 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-heading text-sm font-bold text-white">
            H
          </span>
          <div className="leading-tight">
            <p className="font-heading text-sm font-semibold">Hattersley</p>
            <p className="text-xs text-white/50">Studio CRM</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="truncate text-xs text-white/50">{userEmail ?? "Signed in"}</p>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="mt-1 text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
