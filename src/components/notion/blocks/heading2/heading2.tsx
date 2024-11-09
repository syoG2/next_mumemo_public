import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
    block: Heading2BlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading2: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <div id={block.id} className={colorStyles[block.heading_2.color]}>
            <h2>
                <RichText text={block.heading_2.rich_text} />
            </h2>
            <Children nestBlocks={nestBlocks} />
        </div>
    );
};