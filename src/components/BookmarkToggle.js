import React from "react";
import AddIcon from "../images/bookmark-add.svg";
import RemoveIcon from "../images/cross.svg";
import * as styles from "./BookmarkToggle.module.scss";

export default function BookmarkToggle({ post, bookmarks, setBookmarks }) {
  const bookmarkIndex = bookmarks.findIndex((el) => {
    return el.slug === post.childMdx.fields.slug;
  });
  function toggleBookmark() {
    setBookmarks((prevBookmarks) => {
      if (bookmarkIndex === -1) {
        const bookmark = {
          slug: post.childMdx.fields.slug,
        };
        return [...prevBookmarks, bookmark];
      } else {
        return prevBookmarks.filter((el) => {
          return el.slug !== post.childMdx.fields.slug;
        });
      }
    });
  }

  const addInner = (
    <>
      <span>Als Favorit speichern</span> <AddIcon />
    </>
  );
  const removeInner = (
    <>
      <span>Favorit löschen</span> <RemoveIcon />
    </>
  );

  return (
    <button className={styles.container} onClick={toggleBookmark}>
      {bookmarkIndex === -1 ? addInner : removeInner}
    </button>
  );
}
