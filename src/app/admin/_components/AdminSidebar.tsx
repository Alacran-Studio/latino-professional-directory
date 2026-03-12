"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/types/admin";
import { logout } from "../_actions/logout";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSidebarProps {
  role: UserRole;
  userName: string;
}

interface NavItem {
  href: string;
  label: string;
  roles: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    roles: ["system_admin", "org_admin"],
    icon: HomeIcon,
  },
  {
    href: "/admin/organizations",
    label: "Organizations",
    roles: ["system_admin", "org_admin"],
    icon: UserGroupIcon,
  },
  {
    href: "/admin/queue",
    label: "Approval Queue",
    roles: ["system_admin"],
    icon: ClipboardDocumentListIcon,
  },
  {
    href: "/admin/featured",
    label: "Featured Orgs",
    roles: ["system_admin"],
    icon: StarIcon,
  },
  {
    href: "/admin/invites",
    label: "Manage Admins",
    roles: ["system_admin"],
    icon: UserPlusIcon,
  },
];

export function AdminSidebar({ role, userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const visibleItems = navItems.filter((item) => item.roles.includes(role));
  const roleLabel = role === "system_admin" ? "System Admin" : "Org Admin";

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex shrink-0 flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-48"
        )}
      >
        {/* User section */}
        <div className="shrink-0 border-b border-border p-4">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleCollapsed}
                  className="flex w-full cursor-pointer justify-center"
                >
                  <UserCircleIcon className="h-6 w-6 text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">{userName}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <p className="text-sm text-secondary-foreground">Signed in as</p>
              <p className="font-semibold text-foreground">{userName}</p>
              <span className="bg-primary/10 mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-primary">
                {roleLabel}
              </span>
            </>
          )}
        </div>

        {/* Navigation — only this section scrolls */}
        <nav className="min-h-0 flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "hover:bg-card-hover text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );

              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  ) : (
                    linkContent
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer — always pinned at bottom */}
        <div className="shrink-0 border-t border-border">
          {!collapsed && (
            <div className="flex flex-col gap-2 p-4">
              <Link
                href="/"
                className="flex items-center gap-3 text-sm text-secondary-foreground hover:text-foreground"
              >
                <ArrowLeftIcon className="h-5 w-5 shrink-0" />
                <span>Back to site</span>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-3 text-sm text-secondary-foreground hover:text-foreground"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0" />
                  <span>Sign out</span>
                </button>
              </form>
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={toggleCollapsed}
            className="flex w-full items-center justify-center gap-2 border-t border-border py-2 text-sm text-secondary-foreground hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeftIcon className="h-5 w-5" />
                <span>Collapse Menu</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
