import { graphql } from "gatsby";
import React from "react";
import App from "./App";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import * as styles from "./Post.module.scss";

export const query = graphql`
  query ($id: String!) {
    site: site {
      siteMetadata {
        title
        siteUrl
      }
    }
    post: file(id: { eq: $id }) {
      modifiedTime(locale: "de-DE", formatString: "dddd, D.M.YYYY")
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
        <PostHeader title={frontmatter.title} />
        <div className={styles.body}>
          <PostBody>{children}</PostBody>
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

export default Page;
