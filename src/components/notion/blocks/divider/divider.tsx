import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { DividerBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './divider.module.css';

type Props = {
  block: DividerBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Divider: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <hr id={block.id} className={styles.divider} />
  );
};