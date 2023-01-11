import React from "react";
import HeartIcon from "../images/heart-stroke.svg";
import RemoveIcon from "../images/heart-filled.svg";
import Button from "./Button.js";
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
      <span>Als Favorit speichern</span> <HeartIcon />
    </>
  );
  const removeInner = (
    <>
      <span>Favorit löschen</span> <RemoveIcon />
    </>
  );

  return <Button type="icon" as="button" onClick={toggleBookmark}>{bookmarkIndex === -1 ? addInner : removeInner}</Button>;
}
