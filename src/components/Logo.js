import React from "react";
import * as styles from "./Logo.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

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
      </Link>
      <span className={styles.label}>{data.site.siteMetadata.title}</span>
    </Link>
  );
}
