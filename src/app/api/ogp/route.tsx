import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const size = {
    width: 1200,
    height: 630,
};

export async function GET(request: NextRequest): Promise<ImageResponse> {
    const title = request.nextUrl.searchParams.get('title');
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{ height: 40, backgroundColor: "#5AC8D8", width: "100%" }}
                />
                <h1
                    style={{
                        flex: 1,
                        maxWidth: "80%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {title}
                </h1>
                <div
                    style={{ height: 40, backgroundColor: "#5AC8D8", width: "100%" }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}