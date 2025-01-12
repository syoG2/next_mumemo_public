
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) {
    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(to bottom right, #3978d1, #051b39)',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        position: 'relative',
                        padding: '1.4rem',
                    }}
                >

                </div>
            ),
            {
                ...size,
            },
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}