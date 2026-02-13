import type { Metadata } from "next";
import { JoinForm } from "./_components/JoinForm";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Join - ${APP_NAME}`,
  description:
    "Add your organization to our directory of professional development resources for Latino professionals.",
};

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-lexend mb-2 text-3xl font-semibold text-foreground">
          Add Your Organization
        </h1>
        <p className="mb-8 text-secondary-foreground">
          Submit your organization to be listed in the {APP_NAME}.
        </p>
      </div>

      <JoinForm />
    </main>
  );
}
