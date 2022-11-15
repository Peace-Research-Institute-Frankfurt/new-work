import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "./Post.module.scss";
import Figure from "./Figure";
import Quote from "./Quote";
import File from "./File";
import Leadin from "./Leadin";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const shortCodes = { Figure, Quote, File, Leadin };

export const query = graphql`
  query ($id: String!) {
    post: file(id: { eq: $id }) {
      modifiedTime(locale: "de-DE", formatString:"dddd, D.M.YYYY")
      childMdx {
        frontmatter {
          title
          intro
        }
      }
    }
  }
`;
const Page = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  return (
    <App>
      <article>
        <header className={styles.header}>
          <div className={styles.headerPlaceholder}></div>
          <div className={styles.headerCopy}>
            <div>
              <h1 className={styles.title}>{frontmatter.title}</h1>
              {frontmatter.intro && <p className={styles.intro}>{frontmatter.intro}</p>}
            </div>
          </div>
        </header>
        <div className={styles.body}>
          <MDXProvider components={shortCodes}>{children}</MDXProvider>
        </div>
      </article>
    </App >
  );
};

export function Head({ data }) {
  const frontmatter = data.post.childMdx.frontmatter;
  return (
    <>
      <title>{`${frontmatter.title} – New Work (Eine Anleitung)`}</title>
      <meta name="description" content={`${frontmatter.intro}`} />
    </>
  );
}

export default Page;
