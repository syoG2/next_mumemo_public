
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";

type Props = Readonly<{
    params: { id: string };
}>;

// TODO: Articleコンポーネントの実装
export default function Article({ params }: Props) {
    return (
        <div>
            <h1>Article {params.id}</h1>
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