import { NextResponse } from 'next/server';

interface GuestData {
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

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  // In a real application, you would query your database here
  const guest = mockGuests.get(token);

  if (!guest) {
    return NextResponse.json(
      { error: 'Guest not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(guest);
}