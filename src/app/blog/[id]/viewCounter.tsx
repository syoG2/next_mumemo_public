// TODO:クライアントコンポーネントで閲覧数をカウントするためのコンポーネントを作成する

"use client";
import path from "path";

const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

export default function ViewCounter({ pageId }: { pageId: string }) {
    fetch(path.join(`${deployUrl}`, `/api/viewcount?id=${pageId}`))
    return null
}