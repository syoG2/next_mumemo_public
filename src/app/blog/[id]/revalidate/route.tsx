import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const path = request.nextUrl.href;
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET
    if (process.env.REVALIDATE_SECRET === request.headers.get("secret") && path) {
        console.log(path)
        const pathParts = path.split("/").slice(3, -1);
        const newPath = "/" + pathParts.join("/");
        revalidatePath(newPath);
        console.log(newPath)
        const basePath = "/";
        revalidatePath(basePath);
        console.log(basePath)
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