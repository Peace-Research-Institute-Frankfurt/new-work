import React from "react";
import * as styles from "./Logo.module.scss";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export default function Logo() {
  return (
    <Link className={styles.container} to="/">
      <div className={styles.type}>
        <span className={styles.top}>New Work</span>
        <span className={styles.bottom}>(Eine Anleitung)</span>
      </div>
    </Link>
  );
}
