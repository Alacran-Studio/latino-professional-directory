"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/types/admin";
import { logout } from "../_actions/logout";

interface AdminSidebarProps {
  role: UserRole;
  userName: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", roles: ["system_admin", "org_admin"] },
  {
    href: "/admin/organizations",
    label: "Organizations",
    roles: ["system_admin", "org_admin"],
  },
  { href: "/admin/queue", label: "Approval Queue", roles: ["system_admin"] },
];

export function AdminSidebar({ role, userName }: AdminSidebarProps) {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-4">
        <p className="text-sm text-secondary-foreground">Signed in as</p>
        <p className="font-semibold text-foreground">{userName}</p>
        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {role === "system_admin" ? "System Admin" : "Org Admin"}
        </span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {visibleItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground hover:bg-card-hover"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-2 border-t border-border p-4">
        <Link
          href="/"
          className="text-sm text-secondary-foreground hover:text-foreground"
        >
          Back to site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-secondary-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
