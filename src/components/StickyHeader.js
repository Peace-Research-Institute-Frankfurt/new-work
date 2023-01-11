import React, { useState } from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import BookmarksList from "./BookmarksList";
import Counter from "./Counter";
import Button from "./Button";
import BookmarkToggle from "./BookmarkToggle.js";
import LeftArrow from "../images/arrow-left.svg";
import RightArrow from "../images/arrow-right.svg";
import * as styles from "./StickyHeader.module.scss";

export default function StickyHeader({ chapterIndex, title, next, prev, post, bookmarks, setBookmarks }) {
  const [bookmarksActive, setBookmarksActive] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition.y > 50;
  let scrollProgress = 0;
  if (typeof window !== "undefined") {
    scrollProgress = Math.min(1, scrollPosition.y / (document.body.scrollHeight - window.innerHeight));
  }
  const progressBarStyles = {
    width: `${scrollProgress * 100}%`,
  };
  return (
    <>
      <header className={`${styles.container} ${isScrolled && styles.stuck}`}>
        <div className={styles.copy}>
          <div className={styles.left}>
            <Link className={styles.siteTitle} to="/">
              <StaticImage
                imgStyle={{ objectFit: "contain" }}
                placeholder="none"
                width={50}
                layout="constrained"
                className={styles.face}
                src="../images/leibniz-head.png"
                alt="New Work Logo"
              />
              New Work (Eine Anleitung)
            </Link>
            <div className={styles.title}>
              <span>
                {chapterIndex}. {title}
              </span>
            </div>
          </div>
          <div className={styles.controls}>
            <nav className={styles.pagination}>
              {prev && (
                <Link to={`/${prev.childMdx.fields.slug}`}>
                  <LeftArrow />
                </Link>
              )}
              {next && (
                <Link to={`/${next.childMdx.fields.slug}`}>
                  <RightArrow />
                </Link>
              )}
            </nav>
            <BookmarkToggle post={post} bookmarks={bookmarks} setBookmarks={setBookmarks} />
            <Button onClick={() => setBookmarksActive(!bookmarksActive)}>Favoriten {bookmarks.length > 0 && <Counter n={bookmarks.length} />}</Button>
            <div className={`${styles.bookmarksContainer} ${bookmarksActive && styles.bookmarksContainerActive}`}>
              <div className={styles.bookmarksContainerInner}>
                <BookmarksList bookmarks={bookmarks} setBookmarks={setBookmarks} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.progress}>
          <div style={progressBarStyles} className={styles.progressInner}></div>
        </div>
      </header>
      <button className={`${styles.backdrop} ${bookmarksActive && styles.backdropActive}`} onClick={() => setBookmarksActive(false)}>
        Close Bookmarks
      </button>
    </>
  );
}
