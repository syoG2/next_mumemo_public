import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
type Props = {
    params: Promise<{ id: string }>;
};

// TODO: Articleコンポーネントの実装
export default async function Article({ params }: Props) {
    const props = await params;
    if (blogDatabaseId) {
        const pages = await getDatabase(blogDatabaseId);

        return (
            <Main>
                {pages.map((page) => {
                    return (
                        <h1 key={page.object.id}>{page.object.id}</h1>
                    );
                })}
            </Main>
        )
    } else {
        return (
            <Main>
                <h1>Article {props.id}</h1>
            </Main>
        )
    }
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