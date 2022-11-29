import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./index.module.scss";
import App from "../components/App";
import { StaticImage } from "gatsby-plugin-image";
import LeibnizLogo from "../images/logo-black.svg";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { gri } from "../components/util";

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        title
      }
    }
    posts: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "posts" } }, sort: { childMdx: { frontmatter: { order: ASC } } }) {
      nodes {
        id
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            order
            intro
            authors {
              frontmatter {
                name
                author_id
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
      byline = fm.authors.map((a, j) => {
        const authorImage = getImage(a.frontmatter.image);
        const imageStyles = {
          transform: `rotate(${gri(-30, 10)}deg)`,
        };
        return (
          <li key={`authors-${i}-${fm.author_id}`}>
            <GatsbyImage
              style={imageStyles}
              objectFit="contain"
              className={styles.bylineImage}
              image={authorImage}
              alt={`${a.frontmatter.name} profile image`}
            />
          </li>
        );
      });
    }
    return (
      <li key={`post-${i}`}>
        <Link className={styles.postsItem} to={node.childMdx.fields.slug}>
          <h2 className={styles.postsTitle}>{fm.order}. {fm.title}</h2>
          <ul className={styles.postsAuthors}>{byline}</ul>
          <p className={styles.postsIntro}>{fm.intro}</p>
        </Link>
      </li>
    );
  });
  return (
    <App>
      <header role="banner" className={styles.hero}>
        <h1 className={styles.title}>
          <div>
            <span className={styles.titleMain}>
              <span className={styles.w}>W</span>
              <span className={styles.o}>o</span>
              <span>r</span>
              <span>k</span>
              <span> </span>
              <span>N</span>
              <span className={styles.e}>e</span>
              <span className={styles.w}>w</span>
            </span>
          </div>
          <div className={styles.tagline}>
            <p>Wie wir Räume, Kulturen und Netzwerke für die Zukunft gestalten</p>
          </div>
          <span className={styles.titleSecondary}><span className={styles.at}>@</span>Leibniz</span>
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
        <a href="https://www.leibniz-gemeinschaft.de/" className={styles.sticker}>
          <LeibnizLogo />
        </a>
      </header>
      <section className={styles.content}>
        <ol className={styles.posts}>{posts}</ol>
      </section>
    </App>
  );
};

export default Index;

export const Head = ({ data }) => <title>{data.site.siteMetadata.title}</title>;
