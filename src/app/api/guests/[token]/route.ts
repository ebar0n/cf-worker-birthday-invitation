import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface GuestData {
  name: string;
  attendance: string;
  vehiclePlate?: string;
  guests?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { env } = getCloudflareContext();

  // Access the D1 database from the environment
  // In Cloudflare Workers, env is provided by the runtime
  const db = env.DB;

  if (!db) {
    return NextResponse.json(
      { error: 'Database connection not available' },
      { status: 500 }
    );
  }

  try {
    // Query the database for the guest with the provided token
    const guest = await db.prepare(
      "SELECT name, attendance, vehiclePlate, guests FROM invitation WHERE token = ?"
    ).bind(token).first() as GuestData;

    if (!guest) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(guest);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error fetching guest data' },
      { status: 500 }
    );
  }
}
