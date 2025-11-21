import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
    return NextResponse.json(store.getPreferences());
}

export async function POST(request: Request) {
    const body = await request.json();
    const updatedPreferences = store.updatePreferences(body);
    return NextResponse.json(updatedPreferences);
}
