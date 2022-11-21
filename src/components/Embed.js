import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import MarkdownRenderer from "react-markdown-renderer";
import * as styles from "./Embed.module.scss";

function Embed({ src, caption, title, provider }) {
  const data = useStaticQuery(graphql`
    query {
      providers: allEmbedProvidersJson {
        nodes {
          description
          provider
        }
      }
    }
  `);
  let providerData = null;
  data.providers.nodes.forEach((p) => {
    if (p.provider === provider) {
      providerData = p;
    }
  });
  const [isActive, setIsActive] = useState(false);

  function handleLoadClick() {
    setIsActive(true);
  }

  return (
    <figure>
      {!isActive && (
        <div className={styles.consent}>
          <MarkdownRenderer markdown={providerData.description} />
          <div className={styles.controls}>
            <button className={styles.button} onClick={handleLoadClick}>
              Eingebetteten Inhalt laden
            </button>
            <label htmlFor="remember">
              Remember choice?
              <input type="checkbox" id="remember" />
            </label>
          </div>
        </div>
      )}
      {isActive && (
        <>
          <div className={styles.iframeContainer}>
            <iframe
              title={title}
              src={src}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <figcaption>{caption}</figcaption>
        </>
      )}
    </figure>
  );
}

function Vimeo({ url, width, height }) {
  const matches = url.match(/(?:player.vimeo.com\/video\/)(\d+)/);
  return (
    <Embed
      provider="vimeo"
      width={width}
      height={height}
      src={`https://player.vimeo.com/video/${matches[1]}?h=0e92d36ba9&title=0&byline=0&portrait=0`}
    />
  );
}

function Youtube({ url, title, caption, width, height }) {
  const matches = url.match(/(?:youtube.com\/watch\?v=)(.+)/);
  return (
    <Embed
      width={width}
      height={height}
      title={title}
      src={`https://www.youtube-nocookie.com/embed/${matches[1]}`}
      caption="This is a youtube embed"
      provider="youtube"
    />
  );
}

export { Vimeo, Youtube };
