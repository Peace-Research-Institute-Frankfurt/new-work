import React from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as styles from "./StickyHeader.module.scss";

export default function StickyHeader({ chapterIndex, title, next, prev }) {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition.y > 50;
  let scrollProgress = 0;
  if (typeof window !== "undefined") {
    scrollProgress = Math.min(1, scrollPosition.y / (document.body.scrollHeight - window.innerHeight));
  }
  const progressBarStyles = {
    width: `${scrollProgress * 100}%`,
  };
  return (
    <header className={`${styles.container} ${isScrolled && styles.stuck}`}>
      <div className={styles.copy}>
        <Link className={styles.siteTitle} to="/">
          <StaticImage
            imgStyle={{ objectFit: "contain" }}
            placeholder="none"
            width={50}
            layout="constrained"
            className={styles.face}
            src="../images/leibniz-head.png"
            alt="New Work Logo"
          />
          New Work (Eine Anleitung)
        </Link>
        <div className={styles.title}>
          <span>
            {chapterIndex}. {title}
          </span>
        </div>
        <nav className={styles.pagination}>
          {prev && <Link to={prev.childMdx.fields.slug}>←</Link>}
          {next && <Link to={next.childMdx.fields.slug}>→</Link>}
        </nav>
      </div>
      <div className={styles.progress}>
        <div style={progressBarStyles} className={styles.progressInner}></div>
      </div>
    </header>
  );
}
