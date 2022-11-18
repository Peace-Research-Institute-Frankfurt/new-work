import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./index.module.scss";
import App from "../components/App";
import { StaticImage } from "gatsby-plugin-image";
import LeibnizLogo from "../images/logo-black.svg";

export const query = graphql`
  query {
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
        return a.frontmatter.name;
      });
    }
    return (
      <li key={`post-${i}`}>
        <Link className={styles.postsItem} to={node.childMdx.fields.slug}>
          <span className={styles.postIndex}>{i}</span>
          <h2 className={styles.postsTitle}>{fm.title}</h2>
          <span className={styles.postsMeta}>{byline}</span>
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
              N<span className={styles.e}>e</span>
              <span className={styles.w}>w</span> W<span className={styles.o}>o</span><span className={styles.r}>r</span>k
            </span>
          </div>
          <div className={styles.tagline}>
            <p>Wie man Räume, Kulturen und Netzwerke für eine neue Generation gestaltet.</p>
          </div>
          <span className={styles.titleSecondary}>(Eine Anleitung)</span>
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

export const Head = () => <title>New Work (Eine Anleitung)</title>;
