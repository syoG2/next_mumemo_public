import { getVideoPath } from "@/components/notion/notion";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get('blockId')
  if (blockId) {
    try {
      const url = await getVideoPath(blockId);
      return NextResponse.json({
        url: url,
      })
    } catch {
      return NextResponse.json({
        url: "",
      })
    }
  }

  return NextResponse.json({
    url: "",
  })
}