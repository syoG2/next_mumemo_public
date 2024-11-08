import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";

export function blockToJsx(block: ExPartialBlockObjectResponse | ExBlockObjectResponse) {
    if (block.type === "PartialBlockObjectResponse") {
        return <div>PartialBlockObjectResponse</div>
    } else {
        switch (block.object.type) {
            default:
                return <div id={block.object.id}>{block.object.type ? `'${block.object.type}'には対応していません。` : `blockTypeが存在していません。`}</div>
        }
    }
}