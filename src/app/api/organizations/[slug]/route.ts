import { NextResponse } from "next/server";
import { fetchOrganizationBySlug, fetchEventsForOrganization } from "@/lib/dbOperations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const organization = await fetchOrganizationBySlug(slug);

    if (!organization) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const events = await fetchEventsForOrganization(organization.id);

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
