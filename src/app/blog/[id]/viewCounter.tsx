"use client";

import path from "path";
import { useEffect } from "react";

const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

export default function ViewCounter({ pageId }: { pageId: string }) {
    useEffect(() => {
        const fetchData = async () => {
            await fetch(path.join(`/api/viewcount?id=${pageId}`));
        };
        fetchData();
    }, [pageId]);
    return null
}