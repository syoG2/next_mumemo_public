import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './quote.module.css';

type Props = {
  block: QuoteBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Quote: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <blockquote id={block.id} className={[colorStyles[block.quote.color], styles.quote].join(" ")}>
      <RichText text={block.quote.rich_text} />
    </blockquote>
  );
};