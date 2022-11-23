import React from "react";
import Logo from "./Logo";
import * as styles from "./PostHeader.module.scss";

export default function PostHeader({ intro, title, color, image, meta, fullHeight }) {
  const headerStyles = {
    "--color": color,
  };
  return (
    <header className={`${styles.header} ${fullHeight && styles.isFullHeight}`} style={headerStyles}>
      <div className={styles.headerCopy}>
        <Logo />
        <div className={styles.headerCopyInner}>
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>
        {meta && <div className={styles.headerMeta}>{meta}</div>}
      </div>
      {image}
    </header>
  );
}
