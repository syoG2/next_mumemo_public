import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";

export const revalidate = 86400;

type Props = {
    params: Promise<{ id: string, title: string }>;
};

// TODO: Articleコンポーネントの実装
export default async function Article({ params }: Props) {
    const props = await params;
    if (blogDatabaseId) {

        return (
            <Main>
                <h1>{props.title}</h1>
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
                title: "タイトルです"
            }
        })
    } else {
        return [];
    }
}
