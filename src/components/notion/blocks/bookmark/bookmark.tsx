"use client";

import { ExBlockObjectResponse, ExPartialBlockObjectResponse } from '@/components/notion/notion';
import { RichText } from '@/components/notion/richText/richText';
import type { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import path from "path";
import type { FC } from 'react';
import useSWR from 'swr';
import styles from './bookmark.module.css';

type Props = {
  block: BookmarkBlockObjectResponse,
  nestBlocks: (ExPartialBlockObjectResponse | ExBlockObjectResponse)[],
};

const fetcher = (url: string): Promise<any> => {
  return fetch(url).then(res => res.json());
}
export const Bookmark: FC<Props> = ({ block, nestBlocks }) => {
  const { data, error, isLoading } = useSWR<{ title: string, description: string, image: string }>(path.join(`/api/bookmark?url=${block.bookmark.url}`), fetcher);
  if (isLoading) {
    return (
      <div id={block.id} className={styles.bookmark}>
        <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
          <div className={styles.linkText}>
            <div className={styles.url}>
              {block.bookmark.url}
            </div>
          </div>
        </Link>
        {block.bookmark.caption.length !== 0 &&
          <div className={styles.caption}>
            caption:
            <RichText text={block.bookmark.caption} />
          </div>
        }
      </div>
    )
  } else if (error) {
    return (
      <div id={block.id} className={styles.bookmark}>
        <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
          <div className={styles.linkText}>
            <div className={styles.url}>
              {block.bookmark.url}
            </div>
          </div>
        </Link>
        {block.bookmark.caption.length !== 0 &&
          <div className={styles.caption}>
            caption:
            <RichText text={block.bookmark.caption} />
          </div>
        }
      </div>
    )
  } else if (data) {
    return (
      <div id={block.id} className={styles.bookmark}>
        <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
          <div className={styles.linkText}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.description}>{data.description}</div>
            <div className={styles.url}>
              <img className={styles.favicon} src={`https://www.google.com/s2/favicons?domain=${block.bookmark.url}`} />
              {block.bookmark.url}
            </div>
          </div>
          <img className={styles.linkImage} src={data.image} />
        </Link>
        {block.bookmark.caption.length !== 0 &&
          <div className={styles.caption}>
            caption:
            <RichText text={block.bookmark.caption} />
          </div>
        }
      </div>
    )
  }
  return <div>エラー</div>
  // }else if(data){
  //   <div>あいうえお</div>
  //   // <div id={block.id} className={styles.bookmark}>
  //   //     <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
  //   //       <div className={styles.linkText}>
  //   //         <div className={styles.title}>{data.title}</div>
  //   //         <div className={styles.description}>{data.description}</div>
  //   //         <div className={styles.url}>
  //   //           <img className={styles.favicon} src={`https://www.google.com/s2/favicons?domain=${block.bookmark.url}`}/>
  //   //           {block.bookmark.url}
  //   //           問題なし
  //   //         </div>
  //   //       </div>
  //   //       <img className={styles.linkImage} src={data.image}/>
  //   //     </Link>
  //   //     {block.bookmark.caption.length !== 0 && 
  //   //         <div className={styles.caption}>
  //   //           caption:
  //   //           <RichText text={block.bookmark.caption} />
  //   //         </div>
  //   //     }
  //   // </div>
  // }else{
  //   return (
  //     <div id={block.id} className={styles.bookmark}>
  //       <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
  //         <div className={styles.linkText}>
  //           <div className={styles.url}>
  //             {block.bookmark.url}
  //           </div>
  //         </div>
  //       </Link>
  //       {block.bookmark.caption.length !== 0 && 
  //           <div className={styles.caption}>
  //             caption:
  //             <RichText text={block.bookmark.caption} />
  //           </div>
  //       }
  //     </div>
  //   )
  // }
  // return (
  //   <div id={block.id} className={styles.bookmark}>
  //       <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
  //         <div className={styles.linkText}>
  //           <div className={styles.url}>
  //             {block.bookmark.url}
  //           </div>
  //         </div>
  //       </Link>
  //       {block.bookmark.caption.length !== 0 && 
  //           <div className={styles.caption}>
  //             caption:
  //             <RichText text={block.bookmark.caption} />
  //           </div>
  //       }
  //   </div>
  // <div id={block.id} className={styles.bookmark}>
  //     <Link className={styles.link} href={block.bookmark.url} prefetch={true}>
  //       <div className={styles.linkText}>
  //         <div className={styles.title}>{data.title}</div>
  //         <div className={styles.description}>{data.description}</div>
  //         <div className={styles.url}>
  //           <img className={styles.favicon} src={`https://www.google.com/s2/favicons?domain=${block.bookmark.url}`}/>
  //           {block.bookmark.url}
  //         </div>
  //       </div>
  //       <img className={styles.linkImage} src={data.image}/>
  //     </Link>
  //     {block.bookmark.caption.length !== 0 && 
  //         <div className={styles.caption}>
  //           caption:
  //           <RichText text={block.bookmark.caption} />
  //         </div>
  //     }
  // </div>
  // );
};