import Main from "@/components/layout/main/main";
import { blockToJsx } from "@/components/notion/blockToJsx/blockToJsx";
import multiselectColorStyles from "@/components/notion/multiselectColor.module.css";
import { blogDatabaseId, getDatabase, getPageJson } from "@/components/notion/notion";
import { RichText } from "@/components/notion/richText/richText";
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import ViewCounter from "./viewCounter";

export const revalidate = 86400;

type Props = {
    params: Promise<{ id: string }>;
};

//TODO: OGP画像をブログタイトルから生成する機能を追加する
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const props = await params;
    const pageJson = await getPageJson(props.id);
    switch (pageJson?.page.type) {
        case 'PageObjectResponse':
            if (pageJson.page.object.properties["タイトル"].type === 'title') {
                let imageUrl;
                switch (pageJson.page.object.cover?.type) {
                    case 'external':
                        imageUrl = pageJson.page.object.cover.external.url;
                        break;
                    case 'file':
                        imageUrl = pageJson.page.object.cover.file.url;
                        break;
                    default:
                        imageUrl = "";
                        break;
                }
                const tags = pageJson.page.object.properties["タグ"]?.type === "multi_select" ?
                    pageJson.page.object.properties["タグ"].multi_select.map((tag) => {
                        return (
                            tag.name
                        )
                    }) : [];
                return {
                    title: pageJson.page.object.properties["タイトル"].title.reduce((accumulator, currentValue) => accumulator + currentValue.plain_text, ""),
                    description: pageJson.page.object.properties["タイトル"].title.reduce((accumulator, currentValue) => accumulator + currentValue.plain_text, ""),
                    keywords: tags,
                    openGraph: {
                        images: {
                            url: imageUrl,
                            width: 1200,
                            height: 600,
                        }
                    }
                }
            } else {
                return {}
            }
        case 'PartialPageObjectResponse':
            return {}
    }
    return {}
}

// TODO:ページが存在しない場合のエラーページを作成する
// [ ]:Notionのカバー画像を表示したい
export default async function Article({ params }: Props) {
    const props = await params;
    if (blogDatabaseId) {
        const pageJson = await getPageJson(props.id);
        if (pageJson?.page.type === "PageObjectResponse" && pageJson.page.object.properties["タイトル"].type === "title") {

            const table_of_contents = pageJson.blocks.filter((block) => block.type === 'BlockObjectResponse' && (block.object.type === 'heading_1' || block.object.type === 'heading_2')).map((content) => {
                switch (content.type) {
                    case 'BlockObjectResponse':
                        switch (content.object.type) {
                            case 'heading_1':
                                return (
                                    <div className={styles.navH1}>
                                        <Link className={styles.nav} href={`#${content.object.id}`}>
                                            <RichText text={content.object.heading_1.rich_text} />
                                        </Link>
                                    </div>
                                )
                            case 'heading_2':
                                return (
                                    <div className={styles.navH2}>
                                        <Link className={styles.nav} href={`#${content.object.id}`}>
                                            <RichText text={content.object.heading_2.rich_text} />
                                        </Link>
                                    </div>
                                )
                            default:
                                return <></>
                        }
                    default:
                        return <></>
                }
            })
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit',
                timeZone: 'Asia/Tokyo'
            };
            const createdTime = new Date(pageJson.page.object.created_time).toLocaleDateString('ja-JP', options);

            return (
                <>
                    <Main rside={table_of_contents}>
                        <h1>
                            <RichText text={pageJson.page.object.properties["タイトル"].title} />
                        </h1>
                        <div>作成日時:{createdTime}</div>
                        <div className={styles.tags}>
                            {
                                pageJson.page.object.properties["タグ"]?.type === "multi_select" ?
                                    pageJson.page.object.properties["タグ"].multi_select.map((tag) => {
                                        return (
                                            <div
                                                key={tag.id}
                                                className={[styles.tag, multiselectColorStyles[tag.color]].join(" ")}
                                            >
                                                {tag.name}
                                            </div>
                                        )
                                    }) : <></>
                            }
                        </div>
                        <Link href={`/`}>ホームへ戻る</Link>
                        <hr />
                        {pageJson?.blocks.map((block) => {
                            return blockToJsx(block);
                        })}
                        <Link href={`#header`}>一番上へ</Link>
                    </Main>
                    <ViewCounter pageId={props.id} />
                </>
            )
        }
    }

    return (
        <Main>
            <div>ページが存在しません</div>
        </Main>
    )
}


export async function generateStaticParams() {
    const pages = await getDatabase();
    return pages.map((page) => {
        return {
            id: page.object.id,
        }
    })
}