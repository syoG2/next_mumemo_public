import { ArticleCard } from "@/components/articleCard/articleCard";
import Main from "@/components/layout/main/main";
import { blogDatabaseId, ExDatabaseObjectResponse, ExPageObjectResponse, ExPartialDatabaseObjectResponse, ExPartialPageObjectResponse, getDatabase } from "@/components/notion/notion";
import styles from "./page.module.css";

// TODO: revalidateの使い方が正しいか調べる
export const revalidate = 86400;


// TODO:検索用のページを作る
export default function Home({ timeSortedPages, viewsSortedPages }: { timeSortedPages: (ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse)[], viewsSortedPages: (ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse)[] }) {

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

export const generateStaticProps = async () => {
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
  const timeSortedPages = await getDatabase(timeSortedParam);

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
  const viewsSortedPages = await getDatabase(viewsSortedParam);

  return {
    props: {
      timeSortedPages,
      viewsSortedPages
    },
    revalidate
  }
}