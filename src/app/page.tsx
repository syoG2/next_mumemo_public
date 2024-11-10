import { ArticleCard } from "@/components/articleCard/articleCard";
import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
import useSWR from "swr";
import styles from "./page.module.css";

// TODO: revalidateの使い方が正しいか調べる
export const revalidate = 86400;

const fetcher = async (param: any) => {
  return await getDatabase(param);
};

// TODO:検索用のページを作る
export default function Home() {
  const timeSortedParam = {
    database_id: blogDatabaseId,
    sorts: [
      {
        timestamp: "created_time" as const,
        direction: "descending" as const,
      }
    ],
    filter: {
      property: "公開状態",
      select: {
        equals: "公開"
      }
    },
  }

  const viewsSortedParam = {
    database_id: blogDatabaseId,
    sorts: [
      {
        property: "閲覧数",
        direction: "descending" as const,
      }
    ],
    filter: {
      property: "公開状態",
      select: {
        equals: "公開"
      }
    },
  }

  const { data: timeSortedPages, error: timeSortedError } = useSWR(timeSortedParam, fetcher, { revalidateOnFocus: false, dedupingInterval: revalidate });
  const { data: viewsSortedPages, error: viewsSortedError } = useSWR(viewsSortedParam, fetcher, { revalidateOnFocus: false, dedupingInterval: revalidate });

  if (timeSortedError || viewsSortedError) return <div>Failed to load</div>;
  if (!timeSortedPages || !viewsSortedPages) return <div>Loading...</div>;

  return (
    <Main>
      <h2>作成日順</h2>
      <div className={styles.articleCards}>
        {timeSortedPages.map((page) => {
          if (page.type === "PageObjectResponse") {
            return (
              <ArticleCard page={page} key={page.object.id} />
            )
          }
        })}
      </div>
      <hr />
      <h2>閲覧数順</h2>
      <div className={styles.articleCards}>
        {viewsSortedPages.map((page) => {
          if (page.type === "PageObjectResponse") {
            return (
              <ArticleCard page={page} key={page.object.id} />
            )
          }
        })}
      </div>
    </Main>
  );
}