import { Client } from "@notionhq/client";
import { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse, PartialBlockObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse, QueryDatabaseParameters, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

export const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID ? process.env.NOTION_BLOG_DATABASE_ID : "";

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

export type ExPartialBlockObjectResponse = {
    type: "PartialBlockObjectResponse",
    object: PartialBlockObjectResponse,
}

export type ExBlockObjectResponse = {
    type: "BlockObjectResponse",
    object: BlockObjectResponse | BulletedListBlockObjectResponse | NumberedListBlockObjectResponse,
    children: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
}

export type BulletedListBlockObjectResponse = {
    type: "bulleted_list",
    has_children: true,
}

export type NumberedListBlockObjectResponse = {
    type: "numbered_list",
    has_children: true,
}

export const getDatabase = async (param: QueryDatabaseParameters = {
    database_id: blogDatabaseId,
    filter: {
        property: "公開状態",
        select: {
            equals: "公開"
        }
    },
}): Promise<(ExPageObjectResponse | ExPartialPageObjectResponse | ExPartialDatabaseObjectResponse | ExDatabaseObjectResponse)[]> => {
    try {
        const response: QueryDatabaseResponse = await notion.databases.query(param);

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
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getPage = async (pageId: string): Promise<ExPageObjectResponse | ExPartialPageObjectResponse | null> => {
    try {
        const response = await notion.pages.retrieve({
            page_id: pageId,
        });
        if ('properties' in response) {
            return {
                type: "PageObjectResponse",
                object: response,
            }
        } else {
            return {
                type: "PartialPageObjectResponse",
                object: response,
            }
        }
    } catch (e) {
        console.error(e);
        return null
    }
};

export const getPageJson = async (pageId: string): Promise<{ id: string, page: (ExPageObjectResponse | ExPartialPageObjectResponse), blocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[] } | null> => {
    try {
        const page = await getPage(pageId);
        if (page?.type === "PageObjectResponse") {
            const jsonProperty = page.object.properties?.json;
            if (jsonProperty && jsonProperty.type === 'rich_text') {
                const jsonStr = jsonProperty.rich_text.reduce((acc, cur) => acc + cur.plain_text, "");
                if (jsonStr !== "") {
                    const json = JSON.parse(jsonProperty.rich_text.reduce((acc, cur) => acc + cur.plain_text, ""));
                    return {
                        id: page.object.id,
                        page: page,
                        blocks: json,
                    }
                }
            }
        }
    } catch (e) {
        console.error(e);
        return null;
    }
    return null;
}

export const incrementPageView = async (pageId: string): Promise<void> => {
    const page = await getPage(pageId);
    if (page === null) {
        return;
    }
    if (page.type === "PageObjectResponse") {
        const views = page.object.properties?.閲覧数?.type === "number" ? page.object.properties.閲覧数.number : null;
        try {
            await notion.pages.update({
                page_id: pageId,
                properties: {
                    "閲覧数": {
                        type: "number",
                        number: views ? views + 1 : 1,
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export const getBlock = async (blockId: string): Promise<(ExPartialBlockObjectResponse | ExBlockObjectResponse)> => {
    const response = await notion.blocks.retrieve({
        block_id: blockId,
    })
    let blockObject: (ExPartialBlockObjectResponse | ExBlockObjectResponse);
    if ('type' in response) {
        const children: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[] = [];
        blockObject = {
            type: "BlockObjectResponse",
            object: response,
            children: children,
        };
    } else {
        blockObject = {
            type: "PartialBlockObjectResponse",
            object: response,
        };
    }
    return blockObject;
}

export const getImagePath = async (imageBlockId: string): Promise<string> => {
    try {
        const response = await getBlock(imageBlockId);
        if (response.type === 'BlockObjectResponse' && response.object.type === 'image' && response.object.image.type === 'file') {
            return response.object.image.file.url;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
    return "";
}

export const getFilePath = async (fileBlockId: string): Promise<string> => {
    try {
        const response = await getBlock(fileBlockId);
        if (response.type === 'BlockObjectResponse' && response.object.type === 'file' && response.object.file.type === 'file') {
            return response.object.file.file.url;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
    return "";
}

export const getVideoPath = async (fileBlockId: string): Promise<string> => {
    try {
        const response = await getBlock(fileBlockId);
        if (response.type === 'BlockObjectResponse' && response.object.type === 'video' && response.object.video.type === 'file') {
            return response.object.video.file.url;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
    return "";
}