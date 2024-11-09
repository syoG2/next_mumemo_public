import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
    block: Heading1BlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading1: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <div id={block.id} className={colorStyles[block.heading_1.color]} >
            <h1>
                <RichText text={block.heading_1.rich_text} />
            </h1>
            <Children nestBlocks={nestBlocks} />
        </div>
    );
};