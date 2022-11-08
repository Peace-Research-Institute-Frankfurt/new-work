import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "./File.module.scss";
import DownloadIcon from "../images/download.svg";
export default function File(props) {
  const data = useStaticQuery(graphql`
    query {
      files: allFile {
        nodes {
          relativePath
          base
          name
          extension
          publicURL
          prettySize
        }
      }
    }
  `);

  // Let's find our file
  let file = null;
  data.files.nodes.forEach((f) => {
    if (f.base === props.file) {
      file = f;
    }
  });
  return (
    <a download href={file.publicURL} className={styles.container}>
      <div>
        <span className={styles.title}>{props.title}</span>
        <p className={styles.meta}>
          <span className={styles.type}>{file.extension}</span>
          <span>{file.prettySize.replace(".", ",")}</span>
        </p>
      </div>
      <div>
        <DownloadIcon />
      </div>
    </a>
  );
}
