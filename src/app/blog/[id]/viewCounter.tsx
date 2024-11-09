// TODO:クライアントコンポーネントで閲覧数をカウントするためのコンポーネントを作成する

"use client";

const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;
export default function ViewCounter({ pageId }: { pageId: string }) {
    fetch(`${deployUrl}/api/viewcount/${pageId}`)
    return null
}