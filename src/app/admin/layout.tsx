import { requireAuth } from "@/lib/auth/requireAuth";
import { AdminSidebar } from "./_components/AdminSidebar";
import type { UserRole } from "@/types/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar
        role={user.role as UserRole}
        userName={`${user.first_name} ${user.last_name}`}
      />
      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
