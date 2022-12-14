import React from "react";
import { Link } from "gatsby";
import * as styles from "./Pagination.module.scss";

export default function Pagination({ next, previous }) {
  return (
    <nav className={styles.container}>
      {next && next.childMdx.frontmatter.title && (
        <Link to={`../${next.childMdx.fields.slug}`} className={styles.next} rel="next">
          <span className={styles.label}>Nächstes Kapitel</span>
          <span className={styles.nextTitle}>
            {next.childMdx.frontmatter.order}. {next.childMdx.frontmatter.title}
          </span>
          {next.childMdx.frontmatter.intro && <p className={styles.nextIntro}>{next.childMdx.frontmatter.intro}</p>}
        </Link>
      )}
      {previous && (
        <div className={styles.previous}>
          <span className={styles.label}>Vorheriges Kapitel: </span>
          <Link to={`../${previous.childMdx.fields.slug}`} rel="previous">
            <span>{previous.childMdx.frontmatter.title}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
