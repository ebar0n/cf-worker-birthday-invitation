import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface RSVPData {
  token: string;
  name: string;
  attendance: string;
  vehiclePlate?: string;
  guests?: string;
}

export async function POST(request: Request) {
  try {
    const data: RSVPData = await request.json();
    const { token, name, attendance, vehiclePlate, guests } = data;

    // Get Cloudflare context to access the database
    const { env } = getCloudflareContext();
    const db = env.DB;

    if (!db) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    // Check if the guest exists
    const existingGuest = await db.prepare(
      "SELECT EXISTS(SELECT 1 FROM invitation WHERE token = ?)"
    ).bind(token).first();

    if (!existingGuest) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // Update guest information in the database
    await db.prepare(
      "UPDATE invitation SET name = ?, attendance = ?, vehiclePlate = ?, guests = ?, updated_at = CURRENT_TIMESTAMP WHERE token = ?"
    ).bind(name, attendance, vehiclePlate || null, guests || null, token).run();

    return NextResponse.json({
      success: true,
      message: 'RSVP updated successfully'
    });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}