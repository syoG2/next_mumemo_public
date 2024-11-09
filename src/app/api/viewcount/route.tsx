import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const referer = request.headers.get('referer');
    return NextResponse.json({
        referer: referer
    })
}