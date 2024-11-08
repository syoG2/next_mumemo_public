import Main from "@/components/layout/main/main";
import { blockToJsx } from "@/components/notion/blockToJsx/blockToJsx";
import { blogDatabaseId, getDatabase, getPageJson } from "@/components/notion/notion";
export const revalidate = 86400;

type Props = {
    params: Promise<{ id: string }>;
};

// TODO: Articleコンポーネントの実装
// TODO:クライアントコンポーネントで閲覧数をカウントするためのコンポーネントを作成する
export default async function Article({ params }: Props) {
    const props = await params;
    if (blogDatabaseId) {
        const pageJson = await getPageJson(props.id);
        return (
            <Main>
                {pageJson?.blocks.map((block) => {
                    return blockToJsx(block);
                })}
            </Main>
        )
    } else {
        return (
            <Main>
                <h1>ページが存在しません</h1>
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