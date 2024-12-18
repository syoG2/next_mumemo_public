import { ArticleCard } from "@/components/articleCard/articleCard";
import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import styles from "./page.module.css";

export const revalidate = 86400;

const getPages = cache(
  async (params: QueryDatabaseParameters) => {
    return await getDatabase(params);
  },
)

// TODO:検索用のページを作る
export default async function Home() {
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
  const timeSortedPages = await getPages(timeSortedParam);

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
  const viewsSortedPages = await getPages(viewsSortedParam);


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