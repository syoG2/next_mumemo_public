import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './heading2.module.css';
type Props = {
    block: Heading2BlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Heading2: FC<Props> = ({ block, nestBlocks }) => {
    if ("is_toggleable" in block.heading_2 && block.heading_2.is_toggleable == true) {
        return (
            <details id={block.id} className={[colorStyles[block.heading_2.color], styles.toggle].join(" ")}>
                <summary className={styles.toggleTitle}>
                    <span className={styles.triangle}>▼</span>
                    <h2>
                        <RichText text={block.heading_2.rich_text} />
                    </h2>
                </summary>
                <Children nestBlocks={nestBlocks} />
            </details>
        )
    } else {
        return (
            <div id={block.id} className={colorStyles[block.heading_2.color]}>
                <h2>
                    <RichText text={block.heading_2.rich_text} />
                </h2>
                <Children nestBlocks={nestBlocks} />
            </div>
        );
    }
};