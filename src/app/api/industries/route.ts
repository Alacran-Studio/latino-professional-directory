import { fetchIndustries } from "@/lib/dbOperations";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const industries = await fetchIndustries();
    return NextResponse.json({ industries });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
