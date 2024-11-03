import { Client } from "@notionhq/client";
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export const blogDatabaseId = process.env.BLOG_DATABASE_ID;

export type ExPageObjectResponse = {
    type: "PageObjectResponse",
    object: PageObjectResponse,
}

export type ExPartialPageObjectResponse = {
    type: "PartialPageObjectResponse",
    object: PartialPageObjectResponse,
}

export type ExPartialDatabaseObjectResponse = {
    type: "PartialDatabaseObjectResponse",
    object: PartialDatabaseObjectResponse,
}

export type ExDatabaseObjectResponse = {
    type: "DatabaseObjectResponse",
    object: DatabaseObjectResponse,
}

export const getDatabase = async (databaseId: string): Promise<(ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse)[]> => {
    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "公開状態",
            select: {
                equals: "公開"
            }
        },
    });

    return response.results.map((result) => {
        if (result.object === 'page') {
            if ('properties' in result) {
                return {
                    type: "PageObjectResponse",
                    object: result,
                }
            } else {
                return {
                    type: "PartialPageObjectResponse",
                    object: result,
                }
            }
        } else {
            if ('title' in result) {
                return {
                    type: "DatabaseObjectResponse",
                    object: result,
                }
            } else {
                return {
                    type: "PartialDatabaseObjectResponse",
                    object: result,
                }
            }
        }
    });
}
