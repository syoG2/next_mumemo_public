import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './callout.module.css';

type Props = {
  block: CalloutBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Callout: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div id={block.id}>
      <div className={[colorStyles[block.callout.color], styles.callout].join(" ")}>
        {block.callout.icon?.type === "emoji" &&
          <div>{block.callout.icon.emoji}</div>
        }
        <RichText text={block.callout.rich_text} />
      </div>
      <Children nestBlocks={nestBlocks} />
    </div>
  );
};