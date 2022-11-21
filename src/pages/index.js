import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./index.module.scss";
import App from "../components/App";
import { StaticImage } from "gatsby-plugin-image";
import LeibnizLogo from "../images/logo-black.svg";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        title
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
            authors {
              frontmatter {
                name
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
    }
  }
`;

const Index = ({ data }) => {
  const posts = data.posts.nodes.map((node, i) => {
    const fm = node.childMdx.frontmatter;
    let byline = "";
    if (fm.authors) {
      byline = fm.authors.map((a) => {
        const authorImage = getImage(a.frontmatter.image);
        return (
          <li>
            <GatsbyImage objectFit="contain" className={styles.bylineImage} image={authorImage} alt={`${a.frontmatter.name} profile image`} />
            <span>{a.frontmatter.name}</span>
          </li>
        );
      });
    }
    return (
      <li key={`post-${i}`}>
        <Link className={styles.postsItem} to={node.childMdx.fields.slug}>
          <h2 className={styles.postsTitle}>
            {fm.order}. {fm.title}
          </h2>
          <ul className={styles.postsAuthors}>{byline}</ul>
        </Link>
      </li>
    );
  });
  return (
    <App>
      <header role="banner" className={styles.hero}>
        <h1 className={styles.title}>
          <div>
            <span className={styles.titleMain}>Work New</span>
          </div>
          <div className={styles.tagline}>
            <p>Wie man Räume, Kulturen und Netzwerke für eine neue Generation gestaltet.</p>
          </div>
          <span className={styles.titleSecondary}>Eine Anleitung</span>
        </h1>
        <StaticImage
          imgStyle={{ objectFit: "contain" }}
          placeholder="none"
          layout="constrained"
          className={styles.face}
          loading="eager"
          src="../images/leibniz-head.png"
          alt=""
        />
        <Link to="#1" className={styles.sticker}>
          <LeibnizLogo />
        </Link>
      </header>
      <section className={styles.content}>
        <ol className={styles.posts}>{posts}</ol>
      </section>
    </App>
  );
};

export default Index;

export const Head = ({ data }) => <title>{data.site.siteMetadata.title}</title>;
