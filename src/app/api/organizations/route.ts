import { NextResponse } from "next/server";
import { fetchOrganizations } from "@/lib/dbOperations";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  try {
    const organizations = await fetchOrganizations(page, limit);
    return NextResponse.json({ organizations });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
