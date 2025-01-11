import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './heading3.module.css';

type Props = {
  block: Heading3BlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading3: FC<Props> = ({ block, nestBlocks }) => {
  if ("is_toggleable" in block.heading_3 && block.heading_3.is_toggleable == true) {
    return (
      <details id={block.id} className={[colorStyles[block.heading_3.color], styles.toggle].join(" ")}>
        <summary className={styles.toggleTitle}>
          <span className={styles.triangle}>▼</span>
          <h1>
            <RichText text={block.heading_3.rich_text} />
          </h1>
        </summary>
        <Children nestBlocks={nestBlocks} />
      </details>
    )
  } else {
    return (
      <div id={block.id} className={colorStyles[block.heading_3.color]}>
        <h3>
          <RichText text={block.heading_3.rich_text} />
        </h3>
        <Children nestBlocks={nestBlocks} />
      </div>
    );
  }
};