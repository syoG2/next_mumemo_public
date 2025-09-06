import Main from "@/components/layout/main/main";
import { blogDatabaseId, getDatabase } from "@/components/notion/notion";
import { Table } from "@/components/table/table";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

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

  return (
    <Main>
      <Table pages={timeSortedPages} />
    </Main>
  );
}