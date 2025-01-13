import { ExBlockObjectResponse, ExPartialBlockObjectResponse, getPageJson } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import { siteData } from "@/const/const";
import type { LinkToPageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import type { FC } from 'react';
import styles from './linkToPage.module.css';

type Props = {
    block: LinkToPageBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

// [X]:link_to_pageはinlineで利用する可能性があるため、bookmarkではなく、リンクの形にする
// [X]:リンク先が非公開だった場合、表示しない
export const LinkToPage: FC<Props> = async ({ block, nestBlocks }) => {
    if (block.link_to_page.type === 'page_id') {
        const pageJson = await getPageJson(block.link_to_page.page_id);
        if (pageJson?.page.type === 'PageObjectResponse') {
            if (pageJson.page.object.properties["公開状態"].type === "select" && pageJson.page.object.properties["公開状態"].select?.name === "公開" && pageJson.page.object.properties["タイトル"].type === 'title') {
                const url = `${siteData.url}/blog/${block.link_to_page.page_id}`;
                return (
                    <Link className={styles.link} href={url}>
                        <RichText text={pageJson.page.object.properties["タイトル"].title} />
                    </Link>
                )
            }
        }
    }
    return <></>

};