import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";

export function blockToJsx(block: ExPartialBlockObjectResponse | ExBlockObjectResponse) {
    if (block.type === "PartialBlockObjectResponse") {
        return <div>PartialBlockObjectResponse</div>
    } else {
        switch (block.object.type) {
            case "bulleted_list":
                return <h1>bulleted_list</h1>
            case "numbered_list":
                return <h1>numbered_list</h1>
            default:
                return <div id={block.object.id}>{block.object.type ? `'${block.object.type}'には対応していません。` : `blockTypeが存在していません。`}</div>
        }
    }
}