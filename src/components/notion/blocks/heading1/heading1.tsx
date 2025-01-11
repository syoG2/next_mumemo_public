import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './heading1.module.css';

type Props = {
    block: Heading1BlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading1: FC<Props> = ({ block, nestBlocks }) => {
    if ("is_toggleable" in block.heading_1 && block.heading_1.is_toggleable == true) {
        return (
            <details id={block.id} className={[colorStyles[block.heading_1.color], styles.toggle].join(" ")}>
                <summary className={styles.toggleTitle}>
                    <span className={styles.triangle}>▼</span>
                    <h1>
                        <RichText text={block.heading_1.rich_text} />
                    </h1>
                </summary>
                <Children nestBlocks={nestBlocks} />
            </details>
        )
    } else {
        return (
            <div id={block.id} className={colorStyles[block.heading_1.color]} >
                <h1>
                    <RichText text={block.heading_1.rich_text} />
                </h1>
                <Children nestBlocks={nestBlocks} />
            </div>
        );
    }
};