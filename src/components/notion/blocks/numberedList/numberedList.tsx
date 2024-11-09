import { Children } from '@/components/notion/children/children';
import type { NumberedListBlockObjectResponse } from '@/components/notion/notion';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import type { FC } from 'react';
import styles from './numberedList.module.css';

type Props = {
  block: NumberedListBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const NumberedList: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <ol className={styles.numberedList}>
      <Children nestBlocks={nestBlocks} />
    </ol>
  );
};