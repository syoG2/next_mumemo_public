import colorStyles from '@/components/notion/color.module.css';
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import 'katex/dist/katex.min.css';
import Link from 'next/link';
import type { FC } from 'react';
// TODO:react-katexが読み込めなかった件について調べる
import { InlineMath } from 'react-katex';
// import Latex from 'react-latex-next';
import styles from './richText.module.css';

type Props = {
    text: Array<RichTextItemResponse>;
};

export const RichText: FC<Props> = ({ text }) => {
    return (
        <p className={styles.richText}>
            {text.length === 0 ? (
                <br />
            ) : (
                <>
                    {text.map((textItem, index: number) => {
                        let ret: JSX.Element = <span key={index}></span>
                        if (textItem.type === 'text') {
                            ret = <span
                                key={index}
                                className={
                                    [styles.whitespace,
                                    (textItem.annotations.bold ? styles.bold : ""),
                                    (textItem.annotations.italic ? styles.italic : ""),
                                    (textItem.annotations.strikethrough ? styles.strikethrough : ""),
                                    (textItem.annotations.underline ? styles.underline : ""),
                                    (textItem.annotations.code ? styles.code : (textItem.annotations.color ? colorStyles[textItem.annotations.color] : ""))].join(" ")
                                }
                            >
                                {textItem.plain_text}
                            </span>
                        } else if (textItem.type === 'equation') {
                            ret = <InlineMath key={index}>{textItem.plain_text}</InlineMath>
                            // ret = <Latex key={index}>${textItem.plain_text}$</Latex>
                        } else {
                            ret = <span key={index}></span>
                        }
                        if (textItem.href === null) {
                            return ret;
                        } else {
                            return <Link className={styles.link} key={index} href={textItem.href} prefetch={false}>{ret}</Link>
                        }
                    })}
                </>
            )}
        </p>
    );
};