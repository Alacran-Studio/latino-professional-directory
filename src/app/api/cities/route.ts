import { NextResponse } from "next/server";
import { fetchCities } from "@/lib/dbOperations";

export async function GET() {
  try {
    const cities = await fetchCities();
    return NextResponse.json({ cities });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
