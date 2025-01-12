import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const size = {
    width: 1200,
    height: 600,
};

export async function GET(request: NextRequest): Promise<ImageResponse> {
    const title = request.nextUrl.searchParams.get('title');
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    backgroundColor: "#eeeeee",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{ height: 40, backgroundColor: "#333333", width: "100%" }}
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
                    style={{ height: 40, width: "100%", display: "flex", justifyContent: "flex-end" }}
                >
                    <img style={{
                        height: "100%",
                    }} src="https://mumemo.vercel.app/mu.svg" alt="logo" />
                    <div style={{
                        font: "30px ui-monospace", fontWeight: 900,
                        letterSpacing: "0.15rem",
                        textDecoration: "#ffffff"
                    }}>mumemo</div>
                </div>
                <div
                    style={{ height: 40, backgroundColor: "#333333", width: "100%" }}
                />
            </div >
        ),
        {
            ...size,
        }
    );
}