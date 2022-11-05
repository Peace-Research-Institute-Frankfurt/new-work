import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "./Post.module.scss";
import Figure from "./Figure";
import Quote from "./Quote";
const shortCodes = { Figure, Quote };

export const query = graphql`
  query ($id: String!) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          intro
          color
          order
          authors {
            frontmatter {
              name
              institution
            }
          }
        }
      }
    }
  }
`;
const Post = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  const authors = data.post.childMdx.frontmatter.authors;
  const headerStyles = {
    background: `linear-gradient(to bottom, ${frontmatter.color} 45%, transparent 50%)`,
  };
  let bylines = [];
  if (authors) {
    bylines = authors.map((author) => {
      const fm = author.frontmatter;
      return (
        <li key={fm.name}>
          <em>{fm.name}</em>
          <span>{fm.institution}</span>
        </li>
      );
    });
  }

  return (
    <App>
      <Link href="/">Home</Link>
      <article>
        <header className={styles.header} style={headerStyles}>
          <div className={styles.headerCopy}>
            <h1 className={styles.title}>{frontmatter.title}</h1>
            <ul>{bylines}</ul>
            {frontmatter.intro && <p className={styles.intro}>{frontmatter.intro}</p>}
          </div>
        </header>
        <div className={styles.body}>
          <MDXProvider components={shortCodes}>{children}</MDXProvider>
        </div>
      </article>
    </App>
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

export default Post;
