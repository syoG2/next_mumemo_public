"use client"

import { ExDatabaseObjectResponse, ExPageObjectResponse, ExPartialDatabaseObjectResponse, ExPartialPageObjectResponse } from '@/components/notion/notion';
import Link from 'next/link';
import path from 'path';
import type { FC } from 'react';
// import useSWR from 'swr';
import multiselectColorStyles from '../notion/multiselectColor.module.css';
import { RichText } from '../notion/richText/richText';
import styles from './articleCard.module.css';

// TODO: OGP画像を表示する

type Props = {
    page: ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse,
};

const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
};

export const ArticleCard: FC<Props> = ({ page }) => {
    if (page.type === 'PageObjectResponse') {
        // const { data, error, isLoading } = useSWR<{ url: string }>(path.join(`/api/image?blockId=${page.object.id}`), fetcher);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
            timeZone: 'Asia/Tokyo'
        };
        const createdTime = new Date(page.object.created_time).toLocaleDateString('ja-JP', options);
        return (
            <Link className={styles.link} href={path.join(`blog/${page.object.id}`)} prefetch={true}>
                <h3 className={styles.title}>
                    {page.object.properties["タイトル"].type === "title" && <RichText text={page.object.properties["タイトル"].title} />}
                </h3>
                <div className={styles.tags}>
                    {page.object.properties["タグ"].type === "multi_select" && page.object.properties["タグ"].multi_select.map((tag) => {
                        return (
                            <div
                                key={tag.id}
                                className={[multiselectColorStyles[tag.color], styles.tag].join(" ")}
                            >
                                {tag.name}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.createdTime}>
                    作成日時：{createdTime}
                </div>
                {page.object.properties["閲覧数"].type === "number" && <div className={styles.views}>閲覧数：{page.object.properties["閲覧数"].number || 0}</div>}
            </Link>
        )
    }
    return null;
}