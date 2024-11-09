import { incrementPageView } from '@/components/notion/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id === null) {
        return NextResponse.json({ message: "id is required" });
    }
    await incrementPageView(id);
    return NextResponse.json({ id: id });
}