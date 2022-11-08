import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "./Post.module.scss";
import Figure from "./Figure";
import Quote from "./Quote";
import File from "./File";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const shortCodes = { Figure, Quote, File };

export const query = graphql`
  query ($id: String!) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          intro
          color
          order
          reading_time
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 1000)
            }
          }
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
  const heroImage = getImage(frontmatter.hero_image);
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
          <span>{fm.name}</span>
          {fm.institution && <span className={styles.bylineInstitution}>{fm.institution}</span>}
        </li>
      );
    });
  }

  return (
    <App>
      <Link to="/">Home</Link>
      <article>
        <header className={styles.header} style={headerStyles}>
          <div className={styles.headerCopy}>
            <div>
              <h1 className={styles.title}>{frontmatter.title}</h1>
              {frontmatter.intro && <p className={styles.intro}>{frontmatter.intro}</p>}
            </div>
            <div className={styles.headerMeta}>
              <ul className={styles.bylines}>{bylines}</ul>
              <span>{frontmatter.reading_time}min read</span>
            </div>
          </div>
          <GatsbyImage image={heroImage} alt={""}/>
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
