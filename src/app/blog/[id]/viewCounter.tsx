// TODO:クライアントコンポーネントで閲覧数をカウントするためのコンポーネントを作成する

"use client";
import path from "path";
import { useEffect } from "react";

const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

export default function ViewCounter({ pageId }: { pageId: string }) {
    useEffect(() => {
        const fetchData = async () => {
            await fetch(path.join(`https://next-mumemo-public.vercel.app/`, `/api/viewcount?id=${pageId}`));
        };
        fetchData();
    }, [pageId]);
    return null
}