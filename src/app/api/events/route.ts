import { NextResponse } from "next/server";
import { fetchEvents } from "@/lib/dbOperations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  try {
    const events = await fetchEvents(page, limit);
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
