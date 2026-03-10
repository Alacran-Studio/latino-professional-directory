import { fetchInviteByToken } from "@/lib/admin/inviteOperations";
import { AcceptInviteForm } from "./_components/AcceptInviteForm";

interface AcceptInvitePageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <ErrorState message="This invite link is invalid." />;
  }

  const invite = await fetchInviteByToken(token);

  if (!invite) {
    return <ErrorState message="This invite is invalid or has already been used." />;
  }

  if (invite.status !== "pending") {
    return <ErrorState message="This invite is invalid or has already been used." />;
  }

  if (new Date(invite.expires_at) < new Date()) {
    return <ErrorState message="This invite has expired. Please contact an admin." />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-lexend text-2xl font-semibold text-foreground">
            You&apos;ve been invited
          </h1>
          <p className="mt-2 text-secondary-foreground">
            Set up your admin account for{" "}
            <span className="font-medium text-foreground">{invite.organization_name}</span>
          </p>
        </div>

        <AcceptInviteForm
          token={token}
          firstName={invite.first_name}
          lastName={invite.last_name}
          email={invite.email}
        />
      </div>
    </main>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-secondary-foreground">{message}</p>
      </div>
    </main>
  );
}
