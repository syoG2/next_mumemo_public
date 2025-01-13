import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { TableBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './table.module.css';

type Props = {
    block: TableBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Table: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <table id={block.id} className={styles.table}>
            <tbody className={styles.tb}>
                {nestBlocks.map((block) => {
                    switch (block.type) {
                        case 'BlockObjectResponse':
                            switch (block.object.type) {
                                case 'table_row':
                                    return (
                                        <tr key={block.object.id}>
                                            {block.object.table_row.cells.map((cell, index: number) => {
                                                return (
                                                    <td className={styles.td} key={index}>
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