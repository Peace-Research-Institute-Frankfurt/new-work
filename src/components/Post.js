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
import useScrollPosition from "./useScrollPosition";
const shortCodes = { Figure, Quote, File, Leadin };

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
          hero_alt
          hero_credit
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 1000)
            }
          }
          authors {
            frontmatter {
              name
              author_id
              institution
              role
              image {
                childImageSharp {
                  gatsbyImageData(placeholder: NONE)
                }
              }
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
  const scrollPosition = useScrollPosition();
  const headerStyles = {
    "--color": frontmatter.color,
  };
  let bylines = [];
  if (authors) {
    bylines = authors.map((author) => {
      const fm = author.frontmatter;
      const authorImage = getImage(fm.image);
      return (
        <li key={fm.name}>
          <GatsbyImage className={styles.bylineImage} image={authorImage} alt={`${fm.name} profile image`} />
          <span className={styles.bylineName}>{fm.name}</span>
          {fm.institution && (
            <span className={styles.bylineInstitution}>
              {fm.role && `${fm.role} ·`} {fm.institution}
            </span>
          )}
        </li>
      );
    });
  }
  const isScrolled = scrollPosition.y > 50;
  let scrollProgress = 0;
  if (typeof window !== "undefined") {
    scrollProgress = Math.min(1, scrollPosition.y / (document.body.scrollHeight - window.innerHeight));
  }
  const progressBarStyles = {
    width: `${scrollProgress * 100}%`,
  };
  return (
    <App>
      <nav className={`${styles.nav} ${isScrolled && styles.navStuck}`}>
        <Link className={styles.navHome} to="/">
          New Work (Eine Anleitung)
        </Link>
        <span className={styles.navTitle}>
          {frontmatter.title}
        </span>
        <div className={styles.navProgress}>
          <div style={progressBarStyles} className={styles.navProgressInner}></div>
        </div>
      </nav>
      <article>
        <header className={styles.header} style={headerStyles}>
          <div className={styles.headerPlaceholder}></div>
          <div className={styles.headerCopy}>
            <div>
              <h1 className={styles.title}>{frontmatter.title}</h1>
              {frontmatter.intro && <p className={styles.intro}>{frontmatter.intro}</p>}
            </div>
          </div>
          <div className={styles.headerMeta}>
            <ul className={styles.bylines}>{bylines}</ul>
            <span>{frontmatter.reading_time}min read</span>
          </div>
          <div className={styles.headerImage}>
            <GatsbyImage image={heroImage} alt={frontmatter.hero_alt} />
            <p className={styles.heroCredit}>{frontmatter.hero_credit}</p>
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
