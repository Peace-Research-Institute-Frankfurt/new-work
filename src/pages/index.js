import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./index.module.scss";
import App from "../components/App";
import { StaticImage } from "gatsby-plugin-image";

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
          }
        }
      }
    }
  }
`;

const Index = ({ data }) => {
  const posts = data.posts.nodes.map((node, i) => {
    return (
      <li key={`post-${i}`}>
        <Link className={styles.postsItem} to={node.childMdx.fields.slug}>
          <h2 className={styles.postsTitle}>{node.childMdx.frontmatter.title}</h2>
        </Link>
      </li>
    );
  });
  return (
    <App>
      <header role="banner" className={styles.hero}>
        <h1 className={styles.title}>
          <div className={styles.titleTop}>
            <span className={styles.titleMain}>
              N<span className={styles.e}>e</span><span className={styles.w}>w</span> W<span className={styles.o}>o</span>rk
            </span>
            <p className={styles.tagline}>Wie man Räume, Kulturen und Netzwerke für eine neue Generation gestaltet.</p>
          </div>
          <span className={styles.titleSecondary}>(Eine Anleitung)</span>
        </h1>
        <StaticImage
          imgStyle={{ objectFit: "contain" }}
          placeholder="none"
          layout="constrained"
          className={styles.face}
          src="../images/leibniz-head.png"
          alt=""
        />
        <Link to="#1" className={styles.sticker}>Leibniz</Link>
      </header>
      <section className={styles.content}>
        <ol className={styles.posts}>{posts}</ol>
      </section>
    </App>
  );
};

export default Index;

export const Head = () => <title>New Work (Eine Anleitung)</title>;
