import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import * as Styles from "./Post.module.scss";
const shortCodes = {};

export const query = graphql`
  query ($id: String!) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          intro
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
      <article>
        <header>
          <Link href="/">Home</Link>
          <h1>{frontmatter.title}</h1>
          <ul>{bylines}</ul>
          {frontmatter.intro && <p className={Styles.intro}>{frontmatter.intro}</p>}
        </header>
        <div className={Styles.body}>
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
      <title>{frontmatter.title}</title>
      <meta name="description" content={frontmatter.intro} />
    </>
  );
}

export default Post;
