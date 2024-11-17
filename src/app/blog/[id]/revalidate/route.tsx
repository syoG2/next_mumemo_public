import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const path = request.nextUrl.href
    console.log(request.nextUrl.origin)
    if (path) {
        const pathParts = path.split("/");
        pathParts.pop();
        const newPath = pathParts.join("/");
        revalidatePath(newPath);
        pathParts.pop();
        pathParts.pop();
        const basePath = pathParts.join("/");
        revalidatePath(basePath);
        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
        })
    }

    return NextResponse.json({
        revalidated: false,
        now: Date.now(),
    })
}