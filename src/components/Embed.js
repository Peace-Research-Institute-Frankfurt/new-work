import React, { useContext, useId, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import MarkdownRenderer from "react-markdown-renderer";
import * as styles from "./Embed.module.scss";
import { EmbedChoicesContext } from "../context/EmbedChoicesContext";

function Embed({ src, caption, title, provider, width, height }) {
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
  const { embedChoices, toggleEmbedChoice } = useContext(EmbedChoicesContext);
  const [temporaryActive, setTemporaryActive] = useState(false);
  let isActive = false;
  if (embedChoices[provider] === true) {
    isActive = true;
  }

  const baseId = useId();

  let providerData = null;
  data.providers.nodes.forEach((p) => {
    if (p.provider === provider) {
      providerData = p;
    }
  });

  const embedStyles = {
    paddingTop: `${(height / width) * 100}%`,
  };

  function handleLoadClick() {
    setTemporaryActive(true);
  }

  return (
    <figure className={styles.container}>
      {!isActive && (
        <div className={styles.consent}>
          <MarkdownRenderer markdown={providerData.description} />
          <div className={styles.controls}>
            <button className={styles.button} onClick={handleLoadClick}>
              Eingebetteten Inhalt laden
            </button>
            <label htmlFor={`embed-choice-${baseId}`}>
              Entscheidung speichern?
              <input
                type="checkbox"
                id={`embed-choice-${baseId}`}
                checked={isActive}
                onChange={(e) => {
                  toggleEmbedChoice(provider);
                }}
              />
            </label>
          </div>
        </div>
      )}
      {isActive && (
        <>
          <div className={styles.iframeContainer} style={embedStyles}>
            <iframe
              title={title}
              src={src}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <figcaption className={styles.caption}>{caption}</figcaption>
        </>
      )}
    </figure>
  );
}

function Vimeo({ url, width, height, caption }) {
  const matches = url.match(/(?:vimeo.com\/)(\d+)/);
  let src = null;
  if (matches && matches[1]) {
    src = `https://player.vimeo.com/video/${matches[1]}?h=0e92d36ba9&title=0&byline=0&portrait=0`;
  }
  return <Embed provider="vimeo" width={width} height={height} src={src} caption={caption} />;
}

function Youtube({ url, title, caption, width, height }) {
  const matches = url.match(/(?:youtube.com\/watch\?v=)(.+)/);
  return (
    <Embed
      width={width}
      height={height}
      title={title}
      src={`https://www.youtube-nocookie.com/embed/${matches[1]}`}
      caption={caption}
      provider="youtube"
    />
  );
}

export { Vimeo, Youtube };
