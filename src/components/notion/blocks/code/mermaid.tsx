"use client";

import mermaid from "mermaid";
// import React from 'react';
import { FC, useEffect, useState } from 'react';
import styles from './code.module.css';

mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "Fira Code"
});


type Props = {
    chart: string;
};

// export default class Mermaid extends React.Component {
//     componentDidMount() {
//         mermaid.contentLoaded();
//     }
//     render() {
//         return <div className="mermaid">{chart}</div>;
//     }
// }

export const Mermaid: FC<Props> = ({ chart }) => {
    mermaid.contentLoaded();

    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setFlag(true);
    }, []);
    return (
        <div className={styles.mermaid}>
            {flag && <div className="mermaid">{chart}</div>}
        </div>
    );
}
