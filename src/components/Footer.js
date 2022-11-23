import React from "react";
import * as styles from "./SiteFooter.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        buildTime(formatString: "D MMMM Y, HH:mm", locale: "de")
      }
      site: site {
        siteMetadata {
          title
        }
      }
      pages: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "pages" } }, sort: { childMdx: { frontmatter: { order: ASC } } }) {
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
      <div>
        <nav className={styles.nav}>
          <ul>
            {data.pages.nodes.map((p) => {
              return (
                <li key={`navitem-${p.id}`}>
                  <Link to={p.childMdx.fields.slug}>{p.childMdx.frontmatter.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <p className={styles.meta}>© HSFK {new Date().getFullYear()}</p>
    </footer>
  );
}
