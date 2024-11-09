import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { ToggleBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './toggle.module.css';

type Props = {
  block: ToggleBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Toggle: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <details id={block.id} className={[colorStyles[block.toggle.color], styles.toggle].join(" ")}>
      <summary className={styles.toggleTitle}>
        <span className={styles.triangle}>▼</span>
        <RichText text={block.toggle.rich_text} />
      </summary>
      <Children nestBlocks={nestBlocks} />
    </details>
  );
};