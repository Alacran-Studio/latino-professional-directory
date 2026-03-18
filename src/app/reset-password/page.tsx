import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FullBrand } from "@/components/common/FullBrand";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <FullBrand fillColor="var(--foreground)" textClassName="text-foreground" />
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-md">
          <h1 className="font-lexend mb-2 text-center text-2xl font-semibold text-foreground">
            Set a new password
          </h1>
          <p className="mb-6 text-center text-sm text-secondary-foreground">
            Choose a new password for your account.
          </p>

          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
