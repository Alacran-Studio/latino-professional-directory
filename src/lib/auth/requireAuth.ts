import { redirect } from "next/navigation";
import { getAuthUser, type DbUser } from "./getUser";

export async function requireAuth(): Promise<DbUser> {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }
  return authUser.dbUser;
}

export async function requireRole(role: string): Promise<DbUser> {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect("/admin");
  }
  return user;
}
