"use client";

import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { FileBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import path from 'path';
import type { FC } from 'react';
import useSWR from "swr";
import styles from './file.module.css';

type Props = {
    block: FileBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
};

export const File: FC<Props> = ({ block, nestBlocks }) => {
    const { data, error, isLoading } = useSWR<{ url: string }>(path.join(`/api/file?blockId=${block.id}`), fetcher);
    if (block.file.type === 'file') {
        if (isLoading) {
            return <div>ファイル読み込み中です。</div>
        } else if (error) {
            return <div>ファイルでエラーが発生しました。</div>
        } else if (data) {
            return (
                <Link className={styles.link} href={data.url} >
                    {block.file.name}
                </Link>
            )
        } else {
            return <div>ファイルが存在しません。</div>
        }
    } else {
        return (
            <Link className={styles.link} href={block.file.external.url} prefetch={true}>
                {block.file.name}
            </Link>
        )
    }
};