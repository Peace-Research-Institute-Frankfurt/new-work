import React from "react";
import * as styles from "./Quote.module.scss";
import MarkdownRenderer from "react-markdown-renderer";

export default function Quote({children, cite, image}) {
  return (
    <blockquote className={styles.container}>
      <div className={styles.text}>{children}</div>
      <cite className={styles.cite}>
        <MarkdownRenderer markdown={cite} />
      </cite>
    </blockquote>
  );
}
