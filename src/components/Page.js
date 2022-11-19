import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import PostBody from "./PostBody";
import Logo from "./Logo";
import * as styles from "./Post.module.scss";

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
          <Logo/>
          <div className={styles.headerCopy}>
            <div>
              <h1 className={styles.title}>{frontmatter.title}</h1>
              {frontmatter.intro && <p className={styles.intro}>{frontmatter.intro}</p>}
            </div>
          </div>
        </header>
        <div className={styles.body}>
          <PostBody>{children}</PostBody>
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
