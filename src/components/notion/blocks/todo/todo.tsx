import { Children } from '@/components/notion/children/children';
import colorStyles from '@/components/notion/color.module.css';
import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from "@/components/notion/notion";
import { RichText } from '@/components/notion/richText/richText';
import type { ToDoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';
import styles from './todo.module.css';

type Props = {
  block: ToDoBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

export const Todo: FC<Props> = ({ block, nestBlocks }) => {
  return (
    <div id={block.id} className={[styles.todo, colorStyles[block.to_do.color]].join(" ")}>
      <div className={styles.flex}>
        <input type="checkbox" checked={block.to_do.checked} readOnly />
        <RichText text={block.to_do.rich_text} />
      </div>
      <Children nestBlocks={nestBlocks} />
    </div>
  );
};