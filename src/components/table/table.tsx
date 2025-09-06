"use client";

import { ExDatabaseObjectResponse, ExPageObjectResponse, ExPartialDatabaseObjectResponse, ExPartialPageObjectResponse } from '@/components/notion/notion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import Link from 'next/link';
import path from 'path';
import { useMemo } from 'react';
import multiselectColorStyles from '../notion/multiselectColor.module.css';
import styles from './table.module.css';

type Props = {
    pages: (ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse)[],
};

type Page = {
    id: string;
    title: string;
    tags: {
        id: string;
        name: string;
        color: string;
    }[];
    views: number;
    created_time: string;
    last_edited_time: string;
}

export function Table({ pages }: Props) {

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        timeZone: 'Asia/Tokyo'
    };

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
        // サーバーサイドレンダリング時にも正しい値を返す
        ssrMatchMedia: (query) => ({
            matches: typeof window !== 'undefined'
                ? window.matchMedia(query).matches
                : false, // サーバーサイドではfalse（light）かtrue（dark）を適宜指定
        }),
    });
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const data = useMemo<Page[]>(() => pages.filter(page => page.type === "PageObjectResponse")
        .map((page) => {
            return {
                id: page.object.id,
                title: page.object.properties["タイトル"].type === "title" ? page.object.properties["タイトル"].title.reduce((accumulator, currentValue) => accumulator + currentValue.plain_text, "") : "",
                tags: page.object.properties["タグ"].type === "multi_select" ? page.object.properties["タグ"].multi_select.map((tag) => tag) : [],
                views: page.object.properties["閲覧数"].type === "number" ? page.object.properties["閲覧数"].number || 0 : 0,
                created_time: new Date(page.object.created_time).toLocaleDateString('ja-JP', options),
                last_edited_time: new Date(page.object.last_edited_time).toLocaleDateString('ja-JP', options),
            }
        })
        , []);
    // 全てのタグを取得し、重複を排除
    const allTags = useMemo<Array<string>>(() => {
        return Array.from(new Set(data.flatMap(page => page.tags.map(tag => tag.name))))
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<Page>[]>(
        () => [
            {
                accessorKey: "title",
                header: "タイトル",
                Cell: ({ cell, row }) => {
                    const id = row.original.id;
                    const title = cell.getValue<string>();
                    return (
                        <Link className={styles.link} href={path.join(`blog/${id}`)} prefetch={false}>
                            <h3>
                                {title}
                            </h3>
                        </Link>
                    );
                }
            },
            {
                accessorKey: "tags",
                header: "タグ",
                filterVariant: 'multi-select',
                filterSelectOptions: allTags,
                filterFn: (row, id, filterValue: string[]) => {
                    if (filterValue.length === 0) {
                        return true;
                    } else {
                        return filterValue.every((tag) => row.original.tags.some(t => t.name === tag));
                    }
                },
                Cell: ({ cell }) => {
                    const tags = cell.getValue() as {
                        id: string;
                        name: string;
                        color: string;
                    }[];
                    return (
                        <div className={styles.tags}>
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className={[styles.tag, multiselectColorStyles[tag.color]].join(" ")}
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    );
                },
            },
            {
                accessorKey: "views",
                header: "閲覧数",
                maxSize: 10,
            },
            {
                accessorKey: "created_time",
                header: "作成日",
                maxSize: 10,
            },
            {
                accessorKey: "last_edited_time",
                header: "最終更新日",
                maxSize: 10,
            },
        ],
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                columns={columns}
                data={data}
                initialState={{
                    density: 'comfortable',
                    sorting: [{ id: 'created_time', desc: true }],
                }}
                columnFilterDisplayMode="popover"
            />
        </ThemeProvider>

    );
}