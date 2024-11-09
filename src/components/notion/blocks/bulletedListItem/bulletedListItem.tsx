import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
    block: BulletedListItemBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const BulletedListItem: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <li id={block.id} className={colorStyles[block.bulleted_list_item.color]}>
            <RichText text={block.bulleted_list_item.rich_text} />
            <Children nestBlocks={nestBlocks} />
        </li>
    );
};