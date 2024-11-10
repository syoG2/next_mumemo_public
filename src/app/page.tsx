import { ArticleCard } from "@/components/articleCard/articleCard";
import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
import { unstable_cache } from "next/cache";
import styles from "./page.module.css";

// TODO: revalidateの使い方が正しいか調べる
export const revalidate = 86400;

const getTimeSortedPages = unstable_cache(
  async () => {
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
    return await getDatabase(timeSortedParam);
  },
  [],
  { revalidate: revalidate, tags: [] }
)

const getViewsSortedPages = unstable_cache(
  async () => {
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
    return await getDatabase(viewsSortedParam);
  },
  [],
  { revalidate: revalidate, tags: [] }
)

// TODO:検索用のページを作る
export default async function Home() {
  const timeSortedPages = await getTimeSortedPages();
  const viewsSortedPages = await getViewsSortedPages();


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