import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { BulletedList } from "../blocks/bulletedList/bulletedList";
import { BulletedListItem } from "../blocks/bulletedListItem/bulletedListItem";
import { Heading1 } from "../blocks/heading1/heading1";
import { Heading2 } from "../blocks/heading2/heading2";
import { Paragraph } from "../blocks/paragraph/paragraph";
import { Toggle } from "../blocks/toggle/toggle";

export function blockToJsx(block: ExPartialBlockObjectResponse | ExBlockObjectResponse) {
    if (block.type === "PartialBlockObjectResponse") {
        return <div>PartialBlockObjectResponse</div>
    } else {
        switch (block.object.type) {
            case "bulleted_list":
                return <BulletedList block={block.object} nestBlocks={block.children} />
            case "bulleted_list_item":
                return <BulletedListItem block={block.object} nestBlocks={block.children} />
            case "heading_1":
                return <Heading1 block={block.object} nestBlocks={block.children} />
            case "heading_2":
                return <Heading2 block={block.object} nestBlocks={block.children} />
            case "numbered_list":
                return (
                    <details>
                        <summary>
                            {block.object.type ? `'${block.object.type}'には対応していません。` : `blockTypeが存在していません。`}
                        </summary>
                        <div>
                            {JSON.stringify(block)}
                        </div>
                    </details>
                )
            case "paragraph":
                return <Paragraph block={block.object} nestBlocks={block.children} />
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