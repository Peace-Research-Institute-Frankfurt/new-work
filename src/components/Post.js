import React from "react";
import App from "./App";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "./Post.module.scss";
import Figure from "./Figure";
import Quote from "./Quote";
import File from "./File";
import Leadin from "./Leadin";
import StickyHeader from "./StickyHeader";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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
                  gatsbyImageData(placeholder: NONE, width: 100, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
    posts: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "posts" } }, sort: { fields: childMdx___frontmatter___order }) {
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
`;
const Post = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  const heroImage = getImage(frontmatter.hero_image);
  const authors = data.post.childMdx.frontmatter.authors;
  const headerStyles = {
    "--color": frontmatter.color,
  };
  const currentIndex = data.posts.nodes.findIndex((el) => {
    return el.childMdx.frontmatter.order === frontmatter.order;
  });

  const next = data.posts.nodes[currentIndex + 1];
  const previous = data.posts.nodes[currentIndex - 1];
  let bylines = [];
  if (authors) {
    bylines = authors.map((author) => {
      const fm = author.frontmatter;
      const authorImage = getImage(fm.image);
      return (
        <li className={styles.byline} key={fm.name}>
          <GatsbyImage objectFit="contain" className={styles.bylineImage} image={authorImage} alt={`${fm.name} profile image`} />
          <div className={styles.bylineCopy}>
            <span className={styles.bylineName}>{fm.name}</span>
            {fm.institution && (
              <span className={styles.bylineInstitution}>
                {fm.role && `${fm.role} ·`} {fm.institution}
              </span>
            )}
          </div>
        </li>
      );
    });
  }
  return (
    <App>
      <StickyHeader title={frontmatter.title} chapterIndex={frontmatter.order} next={next} prev={previous} />
      <article>
        <header className={styles.header} style={headerStyles}>
          <Link className={styles.navHome} to="/">
            New Work (Eine Anleitung)
          </Link>
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
            <p className={styles.heroCredit}>Bild: {frontmatter.hero_credit}</p>
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
