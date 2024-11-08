import { blockToJsx } from '@/components/notion/blockToJsx/blockToJsx';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { FC } from 'react';
import styles from './children.module.css';

type Props = {
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Children: FC<Props> = ({ nestBlocks }) => {
    if (nestBlocks.length === 0) {
        return;
    } else {
        return (
            <div className={styles.children}>
                {nestBlocks.map((block) => {
                    return blockToJsx(block);
                })}
            </div>
        );
    }
};