import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import type { SyncedBlockBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import { blockToJsx } from '../../blockToJsx/blockToJsx';

type Props = {
    block: SyncedBlockBlockObjectResponse,
    nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const SyncedBlock: FC<Props> = ({ block, nestBlocks }) => {
    return (
        nestBlocks.map((block) => {
            return blockToJsx(block);
        })
    );
};