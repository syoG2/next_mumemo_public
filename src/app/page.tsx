import { ArticleCard } from "@/components/articleCard/articleCard";
import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
import styles from "./page.module.css";

// TODO: revalidateの使い方が正しいか調べる
export const revalidate = 86400;


// TODO:Homeのコンポーネントを作る。更新順と閲覧数順をYoutubeを参考に作る
// TODO:検索用のページを作る
export default async function Home() {
  const timeSortedParam = {
    database_id: blogDatabaseId,
    sorts: [
      {
        timestamp: "created_time" as "created_time",
        direction: "descending" as "descending"
      }
    ],
    filter: {
      property: "公開状態",
      select: {
        equals: "公開"
      }
    },
  }
  const timeSortedPages = await getDatabase(timeSortedParam);

  const viewsSortedParam = {
    database_id: blogDatabaseId,
    sorts: [
      {
        property: "閲覧数",
        direction: "descending" as "descending"
      }
    ],
    filter: {
      property: "公開状態",
      select: {
        equals: "公開"
      }
    },
  }
  const viewsSortedPages = await getDatabase(viewsSortedParam);

  return (
    <Main>
      <h2>最近の記事</h2>
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