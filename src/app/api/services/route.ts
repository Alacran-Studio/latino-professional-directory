import { fetchServices } from "@/lib/dbOperations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await fetchServices();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
