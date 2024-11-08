import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";

export function blockToJsx(block: ExPartialBlockObjectResponse | ExBlockObjectResponse) {
    if (block.type === "PartialBlockObjectResponse") {
        return <div>PartialBlockObjectResponse</div>
    } else {
        switch (block.object.type) {
            case "bulleted_list":
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