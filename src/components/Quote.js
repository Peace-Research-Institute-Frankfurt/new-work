import React from "react";
import * as styles from "./Quote.module.scss";
export default function Quote(props) {
  return (
    <blockquote className={styles.container}>
      <div className={styles.text}>{props.children}</div>
      <cite className={styles.cite}>{props.cite}</cite>
    </blockquote>
  );
}
