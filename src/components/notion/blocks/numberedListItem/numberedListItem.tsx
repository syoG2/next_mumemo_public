import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
  block: NumberedListItemBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const NumberedListItem: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <li id={block.id} className={colorStyles[block.numbered_list_item.color]}>
      <RichText text={block.numbered_list_item.rich_text} />
      <Children nestBlocks={nestBlocks} />
    </li>
  );
};