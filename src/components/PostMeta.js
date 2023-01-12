import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { gri } from "./util";
import * as styles from "./PostMeta.module.scss";

export default function PostMeta({ authors, readingTime }) {
  let bylines = [];
  if (authors) {
    bylines = authors.map((author) => {
      const fm = author.frontmatter;
      const authorImage = getImage(fm.image);
      return (
        <li className={styles.byline} key={fm.name}>
          <GatsbyImage
            objectFit="contain"
            style={{ left: `${gri(10, 90)}%`, top: `${gri(40, 50)}%`, transform: `rotate(${gri(-30, 30)}deg)` }}
            className={styles.bylineImage}
            image={authorImage}
            alt={`${fm.name} profile image`}
          />
          <div>
            <span className={styles.bylineName}>{fm.name}</span>
            {fm.institution && (
              <span className={styles.bylineInstitution}>
                {fm.role && `${fm.role} ·`} {fm.institution}
              </span>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <div className={styles.container}>
      <ul className={styles.bylines}>{bylines}</ul>
      {readingTime && <span>{readingTime} Minuten</span>}
    </div>
  );
}
