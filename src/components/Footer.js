import React from "react";
import * as styles from "./SiteFooter.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        buildTime(formatString: "D MMMM Y, HH:mm")
      },
      pages: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "pages" } }, sort: { fields: childMdx___frontmatter___order }) {
        nodes {
          id
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
              order
            }
          }
        }
      }
    }
  `);
  return (
    <footer className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          {data.pages.nodes.map(p => {
            return (<li><Link to={p.childMdx.fields.slug}>{p.childMdx.frontmatter.title}</Link></li>)
          })}
        </ul>
      </nav>
      <p><em>New Work (Eine Anleitung)</em> ist eine Publikation der <a href="https://www.hsfk.de/">Hessischen Stiftung für Friedens- und Konfliktforschung (HSFK)</a>.</p>
      <p className={styles.meta}>Built {data.meta.buildTime}</p>
    </footer>
  );
}
