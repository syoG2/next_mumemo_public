import { blogDatabaseId, getDatabase } from "@/components/notion/notion";

type Props = {
    params: Promise<{ id: string }>;
};

// TODO: Articleコンポーネントの実装
export default async function Article({ params }: Props) {
    const props = await params;
    return (
        <div>
            <h1>Article {props.id}</h1>
        </div>
    )
}

export async function generateStaticParams() {
    if (blogDatabaseId) {
        const pages = await getDatabase(blogDatabaseId);
        return pages.map((page) => {
            return {
                id: page.object.id,
            }
        })
    } else {
        return [];
    }
}