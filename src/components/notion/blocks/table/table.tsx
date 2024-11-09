import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { TableBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
    block: TableBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Table: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <table id={block.id} border={1}>
            <tbody>
                {nestBlocks.map((block) => {
                    switch (block.type) {
                        case 'BlockObjectResponse':
                            switch (block.object.type) {
                                case 'table_row':
                                    return (
                                        <tr key={block.object.id}>
                                            {block.object.table_row.cells.map((cell, index: number) => {
                                                return (
                                                    <td key={index}>
                                                        <RichText text={cell} />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                default:
                                    return <></>
                            }
                        default:
                            return <></>
                    }
                })}
            </tbody>
        </table>
    );
};