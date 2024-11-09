"use client";

import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import path from 'path';
import type { FC } from 'react';
import useSWR from "swr";
import styles from './image.module.css';

type Props = {
    block: ImageBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
};

export const NotionImage: FC<Props> = ({ block, nestBlocks }) => {
    const { data, error, isLoading } = useSWR<{ url: string }>(path.join(`/api/image?blockId=${block.id}`), fetcher);
    if (block.image.type === 'file') {
        if (isLoading) {
            return <div>画像読み込み中です。</div>
        } else if (error) {
            return <div>画像読み込みでエラーが発生しました。</div>
        } else if (data) {
            return <img className={styles.image} src={data.url} alt="image" ></img>
        } else {
            return <div>画像が存在しません。</div>
        }
    } else {
        return (
            <img className={styles.image} src={block.image.external.url} alt="image"></img>
        )
    }
};