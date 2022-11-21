import React from "react";
import * as styles from "./Logo.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function Logo() {
  const data = useStaticQuery(graphql`
    query {
      site: site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Link className={styles.container} to="/">
      <div>
        <span className={styles.top}>{data.site.siteMetadata.title}</span>
      </div>
    </Link>
  );
}
