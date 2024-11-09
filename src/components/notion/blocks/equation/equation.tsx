import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import type { EquationBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import { BlockMath } from 'react-katex';
import styles from './equation.module.css';

type Props = {
  block: EquationBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Equation: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div className={styles.equation}>
      <BlockMath>{block.equation.expression}</BlockMath>
    </div>
  );
};