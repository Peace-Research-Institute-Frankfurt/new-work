import * as React from "react";
import { Link, graphql } from "gatsby";

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
        <Link to={node.childMdx.fields.slug}>
          {node.childMdx.frontmatter.order}. {node.childMdx.frontmatter.title}
        </Link>
      </li>
    );
  });
  return (
    <>
      <h1>Posts</h1>
      <ol>{posts}</ol>
    </>
  );
};

export default Index;

export const Head = () => <title>New Work</title>;
