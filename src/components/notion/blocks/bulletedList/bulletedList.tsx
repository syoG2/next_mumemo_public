import { Children } from '@/components/notion/children/children';
import type { BulletedListBlockObjectResponse } from "@/components/notion/notion";
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import type { FC } from 'react';
import styles from './bulletedList.module.css';

type Props = {
    block: BulletedListBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const BulletedList: FC<Props> = ({ block, nestBlocks }) => {
    return (
        <ul className={styles.bulletedList}>
            <Children nestBlocks={nestBlocks} />
        </ul>
    );
};