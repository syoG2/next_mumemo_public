import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { RichText } from '@/components/notion/richText/richText';

type Props = {
    block: ParagraphBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Paragraph: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <div id={block.id} className={colorStyles[block.paragraph.color]}>
            <RichText text={block.paragraph.rich_text} />
            <Children nestBlocks={nestBlocks} />
        </div>
    );
};