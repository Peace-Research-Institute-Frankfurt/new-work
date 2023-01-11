import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import EmailShareForm from "./EmailShareForm";
import CrossIcon from "../images/cross.svg";
import * as styles from "./BookmarksList.module.scss";

export default function BookmarksList({ bookmarks, setBookmarks }) {
  const data = useStaticQuery(graphql`
    query {
      posts: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "posts" } }, sort: { childMdx: { frontmatter: { order: ASC } } }) {
        nodes {
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
              intro
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
  `);

  // Let's find our posts
  const posts = data.posts.nodes.filter((p) => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].slug === p.childMdx.fields.slug) {
        return true;
      }
    }
    return false;
  });

  function removeBookmark(slug) {
    setBookmarks((prevBookmarks) => {
      return prevBookmarks.filter((el) => {
        return el.slug !== slug;
      });
    });
  }

  const bookmarksItems = posts.map((p) => {
    let authors = "";
    if (p.childMdx.frontmatter.authors) {
      authors = (
        <p className={styles.authors}>
          {p.childMdx.frontmatter.authors
            .map((a) => {
              return a.frontmatter.name;
            })
            .join(",")}
        </p>
      );
    }

    const slug = p.childMdx.fields.slug;
    return (
      <li key={`${slug}`} className={styles.item}>
        <Link to={`/${slug}`}>
          <span className={styles.title}>{p.childMdx.frontmatter.title}</span>
          {authors}
        </Link>
        <button className={styles.remove} onClick={() => removeBookmark(slug)}>
          Remove
          <CrossIcon />
        </button>
      </li>
    );
  });

  const bookmarksContent = (
    <>
      <ul>{bookmarksItems}</ul>
      <div className={styles.actions}>
        <EmailShareForm posts={posts} />
      </div>
    </>
  );

  const emptyState = <p className={styles.empty}>Wenn du Artikel zu deinen Favoriten hinzufügst, erscheinen sie hier.</p>;

  return <aside>{bookmarksItems.length > 0 ? bookmarksContent : emptyState}</aside>;
}
