import { requireAuth } from "@/lib/auth/requireAuth";
import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminNavBar } from "./_components/AdminNavBar";
import { Toaster } from "sonner";
import type { UserRole } from "@/types/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Toaster position="top-right" richColors />
      <AdminNavBar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AdminSidebar
          role={user.role as UserRole}
          userName={`${user.first_name} ${user.last_name}`}
        />
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
