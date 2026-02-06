import { NextResponse } from "next/server";
import { fetchEvent } from "@/lib/dbOperations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const event = await fetchEvent(Number(id));
    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
