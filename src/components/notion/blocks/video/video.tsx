"use client";
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import path from 'path';
import type { FC } from 'react';
import useSWR from "swr";
import styles from './video.module.css';
type Props = {
    block: VideoBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};
const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
};

export const Video: FC<Props> = ({ block, nestBlocks }) => {
    const { data, error, isLoading } = useSWR<{ url: string }>(path.join(`/api/video?blockId=${block.id}`), fetcher);

    if (block.video.type == "file") {
        if (isLoading) {
            return <div>動画の読み込み中です。</div>
        } else if (error) {
            return <div>動画の読み込みでエラーが発生しました。</div>
        } else if (data) {
            return <video width="100%" src={data.url} controls>{ }</video>
        } else {
            return <div>動画が存在しません。</div>
        }
    } else {
        if (block.video.external.url.startsWith('https://youtu.be')) {
            const videoId = block.video.external.url.substring('https://youtu.be/'.length);
            const url = `https://www.youtube.com/embed/${videoId}`;
            return (
                <iframe className={styles.youtube} width="100%" height="100%" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            )
        }
    }
    return <div>error</div>
};