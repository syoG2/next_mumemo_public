"use client";

import mermaid from "mermaid";
// import React from 'react';
import { FC, useEffect, useRef } from 'react';
import styles from './code.module.css';



type Props = {
    src: string;
    className?: string;
};


export const Mermaid: FC<Props> = ({ src, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (src && ref.current) {
            mermaid.init({}, ref.current);
        }
    }, []);
    return (
        src ?
            <div className={styles.mermaid}>
                <div className={className} ref={ref} key={src}>
                    {src}
                </div>
            </div>
            : <div className={className} key={src} />
    );
}
