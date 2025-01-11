"use client";

import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import type { LinkToPageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import path from 'path';
import type { FC } from 'react';
import useSWR from 'swr';
import styles from './linkToPage.module.css';

type Props = {
    block: LinkToPageBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
}

export const LinkToPage: FC<Props> = ({ block, nestBlocks }) => {
    const url = block.link_to_page.type === 'page_id'
        ? `https://mumemo.vercel.app/blog/${block.link_to_page.page_id}`
        : null;
    const { data, error, isLoading } = useSWR<{ title: string, description: string, image: string }>(url ? path.join(`/api/bookmark?url=${url}`) : null, fetcher);
    if (!url) {
        return <></>
    }
    if (isLoading && block.link_to_page.type === 'page_id') {
        return (
            <div id={block.id} className={styles.bookmark}>
                <Link className={styles.link} href={url} prefetch={true}>
                    <div className={styles.linkText}>
                        <div className={styles.url}>
                            {url}
                        </div>
                    </div>
                </Link>
            </div>
        )
    } else if (error) {
        return (
            <div id={block.id} className={styles.bookmark}>
                <Link className={styles.link} href={url} prefetch={true}>
                    <div className={styles.linkText}>
                        <div className={styles.url}>
                            {url}
                        </div>
                    </div>
                </Link>
            </div>
        )
    } else if (data) {
        return (
            <div id={block.id} className={styles.bookmark}>
                <Link className={styles.link} href={url} prefetch={true}>
                    <div className={styles.linkText}>
                        <div className={styles.title}>{data.title}</div>
                        <div className={styles.description}>{data.description}</div>
                        <div className={styles.url}>
                            <img className={styles.favicon} src={`https://www.google.com/s2/favicons?domain=${url}`} alt="リンク先のfavicon" />
                            {url}
                        </div>
                    </div>
                    {data.image && <img className={styles.linkImage} src={data.image} alt="リンク先の画像" />}
                </Link>
            </div>
        )
    }
    return <div>エラー</div>

};