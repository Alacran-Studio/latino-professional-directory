import { NextResponse } from "next/server";
import { fetchOrganization, fetchEventsForOrganization } from "@/lib/dbOperations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const [organization, events] = await Promise.all([
      fetchOrganization(Number(id)),
      fetchEventsForOrganization(Number(id)),
    ]);

    return NextResponse.json({
      organization: {
        ...organization,
        events,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
