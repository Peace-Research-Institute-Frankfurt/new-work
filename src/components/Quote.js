import React from "react";
import * as styles from "./Quote.module.scss";
import MarkdownRenderer from "react-markdown-renderer";

export default function Quote(props) {
  return (
    <blockquote className={`${styles.container} ${props.position && styles[props.position]}`}>
      <div className={styles.text}>{props.children}</div>
      <cite className={styles.cite}>
        <MarkdownRenderer markdown={props.cite} />
      </cite>
    </blockquote>
  );
}
