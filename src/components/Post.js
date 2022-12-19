import React from "react";
import App from "./App";
import { graphql } from "gatsby";
import StickyHeader from "./StickyHeader";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import PostMeta from "./PostMeta";
import Pagination from "./PostPagination";
import BookmarkToggle from "./BookmarkToggle";
import BookmarksList from "./BookmarksList";
import useLocalStorage from "../hooks/useLocalStorage";
import * as styles from "./Post.module.scss";

export const query = graphql`
  query ($id: String!) {
    site: site {
      siteMetadata {
        title
      }
    }
    post: file(id: { eq: $id }) {
      childMdx {
        fields {
          slug
        }
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
              gatsbyImageData(width: 1000, placeholder: BLURRED)
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
          }
        }
      }
    }
  }
`;
const Post = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const currentIndex = data.posts.nodes.findIndex((el) => {
    return el.childMdx.frontmatter.order === frontmatter.order;
  });

  const heroImage = (
    <div className={styles.image}>
      <GatsbyImage image={getImage(frontmatter.hero_image)} alt={frontmatter.hero_alt} />
      {frontmatter.hero_credit && <p className={styles.credit}>Bild: {frontmatter.hero_credit}</p>}
    </div>
  );

  const next = data.posts.nodes[currentIndex + 1];
  const previous = data.posts.nodes[currentIndex - 1];

  return (
    <App>
      <StickyHeader
        title={frontmatter.title}
        chapterIndex={frontmatter.order}
        next={next}
        prev={previous}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
      />
      <article>
        <PostHeader
          meta={<PostMeta readingTime={frontmatter.reading_time} authors={frontmatter.authors} />}
          intro={frontmatter.intro}
          image={heroImage}
          title={frontmatter.title}
          fullHeight={true}
          color={frontmatter.color}
        />
        <div className={styles.body}>
          <aside className={styles.actions}>
            <BookmarkToggle post={data.post} bookmarks={bookmarks} setBookmarks={setBookmarks} />
          </aside>
          <PostBody>{children}</PostBody>
          <Pagination next={next} previous={previous} />
        </div>
      </article>
    </App>
  );
};

export function Head({ data }) {
  const frontmatter = data.post.childMdx.frontmatter;
  return (
    <>
      <title>{`${frontmatter.title} – ${data.site.siteMetadata.title}`}</title>
      <meta name="description" content={`${frontmatter.intro}`} />
    </>
  );
}

export default Post;
