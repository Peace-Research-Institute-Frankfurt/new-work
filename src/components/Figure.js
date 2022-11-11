import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./Figure.module.scss";
import React from "react";

export default function Figure(props) {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      licenses: allLicensesJson {
        nodes {
          title
          license_id
          url
        }
      }
      images: allFile(filter: { extension: { nin: ["mdx", "json", "mp3"] } }) {
        nodes {
          relativePath
          base
          name
          extension
          publicURL
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);

  // Let's find our image
  let image = null;
  data.images.nodes.forEach((img) => {
    if (img.base === props.src) {
      image = img;
    }
  });
  // Let's find our license
  let license = null;
  data.licenses.nodes.forEach((l) => {
    if (l.license_id === props.license) {
      license = l;
    }
  });

  let size = props.size;

  let imageEl = <>Image not found (${props.src})</>;

  if (image) {
    if (image.extension === "svg") {
      imageEl = <img className={styles.image} alt={props.alt} src={image.publicURL} />;
    } else {
      imageEl = <GatsbyImage className={styles.image} image={getImage(image)} alt={props.alt}/>;
    }
  }

  return (
    <figure className={[styles[size], styles.container].join(" ")}>
      {imageEl}
      <figcaption className={styles.caption}>
        <span>{props.caption}</span>
        <span className={styles.credit}>
          <>{props.credit}</>
          {license && (
            <>
              {","} <a href={license.url}>{license.title}</a>
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
