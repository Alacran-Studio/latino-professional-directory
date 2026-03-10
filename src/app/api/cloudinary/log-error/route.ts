import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/getUser";

export async function POST(request: Request) {
  const authUser = await getAuthUser();
  const userId = authUser?.dbUser.id ?? "unauthenticated";

  const body = await request.json().catch(() => ({}));
  console.error(
    `[cloudinary/upload-error] user=${userId} stage=${body.stage ?? "unknown"} status=${body.status ?? "?"} error=${JSON.stringify(body.error ?? body.message ?? "no detail")}`
  );

  return NextResponse.json({ ok: true });
}
