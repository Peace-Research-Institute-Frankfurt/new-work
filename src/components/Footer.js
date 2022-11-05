import React from "react";
import * as styles from "./SiteFooter.module.scss";
import { graphql, useStaticQuery } from "gatsby";

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        buildTime(formatString: "D MMMM Y, HH:mm")
      }
    }
  `);
  return (
    <footer className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#1">Impressum</a>
          </li>
          <li>
            <a href="#1">Datenschutz</a>
          </li>
          <li>
            <a href="#1">Barrierefreiheit</a>
          </li>
        </ul>
      </nav>
      <p>New Work (Eine Anleitung) ist eine Publikation der Hessischen Stiftung für Friedens- und Konfliktforschung (HSFK).</p>
      <p className={styles.meta}>Built {data.meta.buildTime}</p>
    </footer>
  );
}
