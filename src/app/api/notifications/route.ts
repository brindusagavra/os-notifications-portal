import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
    return NextResponse.json(store.getNotifications());
}

export async function POST(request: Request) {
    const body = await request.json();

    if (body.action === 'markAsRead') {
        store.markAsRead(body.id);
        return NextResponse.json({ success: true });
    }

    if (body.action === 'create') {
        // For testing purposes
        const newNotification = store.addNotification({
            title: body.title,
            message: body.message,
            type: body.type,
        });
        return NextResponse.json(newNotification);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
