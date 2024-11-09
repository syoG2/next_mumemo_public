import { incrementPageView } from '@/components/notion/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    await incrementPageView(id);
    return NextResponse.json({ id });
}