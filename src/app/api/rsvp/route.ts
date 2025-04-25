import { NextResponse } from 'next/server';

interface GuestData {
  name: string;
  confirmed: boolean;
  adults: number;
  vehiclePlate?: string;
}

interface RSVPData {
  token: string;
  name: string;
  confirmed: boolean;
  adults: number;
  vehiclePlate?: string;
}

// This is a mock database. In a real application, you would use a proper database
const mockGuests = new Map<string, GuestData>([
  ['token1', { name: 'Juan Pérez', confirmed: false, adults: 1 }],
  ['token2', { name: 'María García', confirmed: true, adults: 2 }],
]);

export async function POST(request: Request) {
  try {
    const data: RSVPData = await request.json();
    const { token, name, confirmed, adults, vehiclePlate } = data;

    // In a real application, you would update your database here
    const guest = mockGuests.get(token);

    if (!guest) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // Update guest information
    mockGuests.set(token, {
      name,
      confirmed,
      adults,
      vehiclePlate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}