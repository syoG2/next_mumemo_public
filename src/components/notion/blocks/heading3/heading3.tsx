import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
  block: Heading3BlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading3: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div id={block.id} className={colorStyles[block.heading_3.color]}>
      <h3>
        <RichText text={block.heading_3.rich_text} />
      </h3>
      <Children nestBlocks={nestBlocks} />
    </div>
  );
};