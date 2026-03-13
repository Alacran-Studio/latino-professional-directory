import { fetchCommunities } from "@/lib/dbOperations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const communities = await fetchCommunities();
    return NextResponse.json({ communities });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
