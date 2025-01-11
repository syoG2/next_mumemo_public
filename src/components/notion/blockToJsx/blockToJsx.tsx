import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { Bookmark } from "../blocks/bookmark/bookmark";
import { BulletedList } from "../blocks/bulletedList/bulletedList";
import { BulletedListItem } from "../blocks/bulletedListItem/bulletedListItem";
import { Callout } from "../blocks/callout/callout";
import { Code } from "../blocks/code/code";
import { ColumnList } from "../blocks/columnList/columnList";
import { Divider } from "../blocks/divider/divider";
import { Equation } from "../blocks/equation/equation";
import { Heading1 } from "../blocks/heading1/heading1";
import { Heading2 } from "../blocks/heading2/heading2";
import { Heading3 } from "../blocks/heading3/heading3";
import { NotionImage } from "../blocks/image/image";
import { LinkToPage } from "../blocks/linkToPage/linkToPage";
import { NumberedList } from "../blocks/numberedList/numberedList";
import { NumberedListItem } from "../blocks/numberedListItem/numberedListItem";
import { Paragraph } from "../blocks/paragraph/paragraph";
import { Quote } from "../blocks/quote/quote";
import { SyncedBlock } from "../blocks/syncedBlock/syncedBlock";
import { Table } from "../blocks/table/table";
import { Todo } from "../blocks/todo/todo";
import { Toggle } from "../blocks/toggle/toggle";

//TODO: ページリンクを作成する。ブログ内のリンクになるように注意
export function blockToJsx(block: ExPartialBlockObjectResponse | ExBlockObjectResponse) {
    if (block.type === "PartialBlockObjectResponse") {
        return <div>PartialBlockObjectResponse</div>
    } else {
        switch (block.object.type) {
            case "bookmark":
                return <Bookmark block={block.object} nestBlocks={block.children} />
            case "breadcrumb":
                // breadcrumbはapiから適切なデータが取得できないため、表示しない
                return null;
            case "bulleted_list":
                return <BulletedList block={block.object} nestBlocks={block.children} />
            case "bulleted_list_item":
                return <BulletedListItem block={block.object} nestBlocks={block.children} />
            case "callout":
                return <Callout block={block.object} nestBlocks={block.children} />
            case "child_database":
                // child_databaseはapiから適切なデータが取得できないため、表示しない
                return null;
            case "child_page":
                // child_pageは公開できるように実装していない(適切なプロパティを持っていない)ため、表示しない
                return null;
            case "code":
                return <Code block={block.object} nestBlocks={block.children} />
            case "column_list":
                return <ColumnList block={block.object} nestBlocks={block.children} />
            case "divider":
                return <Divider block={block.object} nestBlocks={block.children} />
            case "equation":
                return <Equation block={block.object} nestBlocks={block.children} />
            case "heading_1":
                return <Heading1 block={block.object} nestBlocks={block.children} />
            case "heading_2":
                return <Heading2 block={block.object} nestBlocks={block.children} />
            case "heading_3":
                return <Heading3 block={block.object} nestBlocks={block.children} />
            case "image":
                return <NotionImage block={block.object} nestBlocks={block.children} />
            case "link_to_page":
                return <LinkToPage block={block.object} nestBlocks={block.children} />
            case "numbered_list":
                return <NumberedList block={block.object} nestBlocks={block.children} />
            case "numbered_list_item":
                return <NumberedListItem block={block.object} nestBlocks={block.children} />
            case "paragraph":
                return <Paragraph block={block.object} nestBlocks={block.children} />
            case "quote":
                return <Quote block={block.object} nestBlocks={block.children} />
            case "synced_block":
                return <SyncedBlock block={block.object} nestBlocks={block.children} />
            case "table":
                return <Table block={block.object} nestBlocks={block.children} />
            case "to_do":
                return <Todo block={block.object} nestBlocks={block.children} />
            case "toggle":
                return <Toggle block={block.object} nestBlocks={block.children} />
            case 'table_of_contents':
                // table_of_contentsはapiから適切なデータが取得できないため、表示しない
                return null
            default:
                return (
                    <details id={block.object.id}>
                        <summary>
                            {block.object.type ? `'${block.object.type}'には対応していません。` : `blockTypeが存在していません。`}
                        </summary>
                        <div>
                            {JSON.stringify(block)}
                        </div>
                    </details>
                )
        }
    }
}