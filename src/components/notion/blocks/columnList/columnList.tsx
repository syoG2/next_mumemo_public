import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { ColumnListBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import { blockToJsx } from '../../blockToJsx/blockToJsx';
import styles from './columnList.module.css';
type Props = {
  block: ColumnListBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const ColumnList: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div id={block.id} className={styles.columnList}>
      {nestBlocks.map((column) => {
        if (column.type === 'BlockObjectResponse' && column.object.type === 'column') {
          return (
            <div key={column.object.id} id={column.object.id} className={styles.column}>
              {column.children.map((block, index: number) => {
                return blockToJsx(block);
              })}
            </div>
          )
        }
      })}
    </div>
  );
};