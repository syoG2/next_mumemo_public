const NOTION_API_KEY = PropertiesService.getScriptProperties().getProperty('NOTION_API_KEY');
const NOTION_BLOG_DATABASE_ID = PropertiesService.getScriptProperties().getProperty('NOTION_BLOG_DATABASE_ID');

function updateBlog() {
    let sheet = SpreadsheetApp.getActiveSheet();
    let lastRow = sheet.getLastRow();
    let pageId = "";
    if (lastRow > 0) {
        pageId = sheet.getRange(lastRow, 1).getValue();
        if (pageId !== "") {
            try {
                const page = getPage(pageId);
                if (page.object.properties["公開状態"].select.name !== "公開") {
                    setBlocks(pageId, null)
                } else {
                    const blocks = getBlocks(pageId);
                    setBlocks(pageId, blocks);
                }
                // UrlFetchApp.fetch(`https://mumemo.vercel.app/api/revalidate?path=/blog/${pageId}`);
                // Utilities.sleep(11000);
                // UrlFetchApp.fetch(`https://mumemo.vercel.app/blog/${pageId}`)
            } catch (e) {
                Logger.log('Error:');
                Logger.log(e);
            }
        }
        sheet.deleteRow(lastRow);
    }
    SpreadsheetApp.flush();

    const lastEditedTime = PropertiesService.getScriptProperties().getProperty('LAST_EDITED_TIME');
    const filter = {
        "filter": {
            "property": "最終更新日時",
            "date": {
                "after": lastEditedTime
            }
        }
    }
    const pages = getDatabase(NOTION_BLOG_DATABASE_ID, filter)
    lastRow = sheet.getLastRow();
    let newLastEditedTime = lastEditedTime;
    pages.map((page) => {
        if (page.object.last_edited_time > newLastEditedTime) {
            newLastEditedTime = page.object.last_edited_time;
        }
        if (page.object.id !== pageId) {
            sheet.getRange(lastRow + 1, 1).setValue(page.object.id);
            lastRow += 1;
        }
    })
    // UrlFetchApp.fetch(`https://mumemo.vercel.app/api/revalidate?path=/`);
    // Utilities.sleep(11000);
    // UrlFetchApp.fetch(`https://mumemo.vercel.app/`);
    PropertiesService.getScriptProperties().setProperty("LAST_EDITED_TIME", newLastEditedTime);
}

function getDatabase(databaseId, filter) {
    let url = `https://api.notion.com/v1/databases/${databaseId}/query`;
    let payload = filter;
    let opts = {
        'method': 'POST',
        'headers': {
            'Notion-Version': '2022-06-28',
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Content-Type': 'application/json'
        },
        'payload': JSON.stringify(payload),
    };
    let response = JSON.parse(UrlFetchApp.fetch(url, opts));

    // 型を判別できる形式で値を返す
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
    })
}

function getPage(pageId) {
    let url = `https://api.notion.com/v1/pages/${pageId}`;
    let opts = {
        'method': 'GET',
        'headers': {
            'Notion-Version': '2022-06-28',
            'Authorization': `Bearer ${NOTION_API_KEY}`,
        },
    };
    let response = JSON.parse(UrlFetchApp.fetch(url, opts));

    // 型を判別できる形式で値を返す
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
}

function getBlocks(blockId) {

    let url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`;
    const opts = {
        'method': 'GET',
        'headers': {
            'Notion-Version': '2022-06-28',
            'Authorization': `Bearer ${NOTION_API_KEY}`
        }
    };
    let response = JSON.parse(UrlFetchApp.fetch(url, opts));

    // blockObjectsにBlockの情報を加えていき、最終的に返す
    const blockObjects = [];

    // bulleted_list_itemが連続している間はbulletedListに追加し、連続が途切れたらblockObjectsに追加する
    let bulletedList = {
        type: "BlockObjectResponse",
        object: {
            type: "bulleted_list",
            has_children: true,
        },
        children: []
    }
    // numbered_list_itemが連続している間はnumberedListに追加し、連続が途切れたらblockObjectsに追加する
    let numberedList = {
        type: "BlockObjectResponse",
        object: {
            type: "numbered_list",
            has_children: true,
        },
        children: []
    }

    for (const result of response.results) {
        if ('type' in result) {
            let children = [];
            if (result.has_children === true) {
                // 再帰的に子要素を取得
                children = getBlocks(result.id);
            } else {
                children = [];
            }
            if (result.type === 'bulleted_list_item') {
                if (numberedList.children.length !== 0) {
                    // numberedListが連続していた場合はblockObjectsに追加
                    blockObjects.push(JSON.parse(JSON.stringify(numberedList)));
                    numberedList.children = [];
                }
                // bulleted_list_itemはbulletedListに追加
                bulletedList.children.push({
                    type: "BlockObjectResponse",
                    object: result,
                    children: children,
                })
            } else if (result.type === 'numbered_list_item') {
                if (bulletedList.children.length !== 0) {
                    // bulletedListが連続していた場合はblockObjectsに追加
                    blockObjects.push(JSON.parse(JSON.stringify(bulletedList)));
                    bulletedList.children = [];
                }
                // numbered_list_itemはnumberedListに追加
                numberedList.children.push({
                    type: "BlockObjectResponse",
                    object: result,
                    children: children,
                })
            } else {
                if (bulletedList.children.length !== 0) {
                    // bulletedListが連続していた場合はblockObjectsに追加
                    blockObjects.push(JSON.parse(JSON.stringify(bulletedList)));
                    bulletedList.children = [];
                }
                if (numberedList.children.length !== 0) {
                    // numberedListが連続していた場合はblockObjectsに追加
                    blockObjects.push(JSON.parse(JSON.stringify(numberedList)));
                    numberedList.children = []
                }
                blockObjects.push({
                    type: "BlockObjectResponse",
                    object: result,
                    children: children,
                });
            }
        } else {
            if (bulletedList.children.length !== 0) {
                // bulletedListが連続していた場合はblockObjectsに追加
                blockObjects.push(JSON.parse(JSON.stringify(bulletedList)));
                bulletedList.children = []
            }
            if (numberedList.children.length !== 0) {
                // numberedListが連続していた場合はblockObjectsに追加
                blockObjects.push(JSON.parse(JSON.stringify(numberedList)));
                numberedList.children = []
            }
            blockObjects.push({
                type: "PartialBlockObjectResponse",
                object: result,
            });
        }
    }
    if (bulletedList.children.length !== 0) {
        // bulletedListが連続していた場合はblockObjectsに追加
        blockObjects.push(JSON.parse(JSON.stringify(bulletedList)));
        bulletedList.children = []
    }
    if (numberedList.children.length !== 0) {
        // numberedListが連続していた場合はblockObjectsに追加
        blockObjects.push(JSON.parse(JSON.stringify(numberedList)));
        numberedList.children = []
    }
    return blockObjects;
}

function splitStringByLength(str, length) {
    let result = [];
    for (let i = 0; i < str.length; i += length) {
        result.push(str.substring(i, i + length));
    }
    return result;
}

function setBlocks(pageId, blocks) {
    let splitedBlocks
    if (blocks !== null) {
        splitedBlocks = splitStringByLength(JSON.stringify(blocks), 2000).map(splitedBlock => {
            return {
                "text": {
                    "content": splitedBlock,
                },
            }
        });
    } else {
        splitedBlocks = [{ "text": { "content": "" } }]
    }
    let url = `https://api.notion.com/v1/pages/${pageId}`;
    let payload = {
        "properties": {
            "json": {
                "rich_text": splitedBlocks
            },
        }
    };
    let opts = {
        'method': 'PATCH',
        'headers': {
            'Notion-Version': '2022-06-28',
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Content-Type': 'application/json'
        },
        'payload': JSON.stringify(payload),
        "muteHttpExceptions": true,
    };
    let response = JSON.parse(UrlFetchApp.fetch(url, opts));
    return response
}