import React, { useContext, useEffect, useId, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import MarkdownRenderer from "react-markdown-renderer";
import * as styles from "./Embed.module.scss";
import { EmbedChoicesContext } from "../context/EmbedChoicesContext";

function Embed({ url, caption, title, provider, width, height }) {
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
  const baseId = useId();
  const { embedChoices, setEmbedChoices } = useContext(EmbedChoicesContext);
  const [rememberChoiceActive, setRememberChoiceActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  if (!provider) provider = "default";

  let providerData = null;
  data.providers.nodes.forEach((p) => {
    if (p.provider === provider) {
      providerData = p;
    }
  });

  useEffect(() => {
    setIsActive(embedChoices[provider] || false);
  }, [embedChoices, provider]);

  const embedStyles = {
    paddingTop: `${(height / width) * 100}%`,
  };

  function handleLoadClick() {
    if (rememberChoiceActive) {
      setEmbedChoices((prev) => {
        let newChoices = { ...prev };
        newChoices[provider] = true;
        return newChoices;
      });
    }
    setIsActive(true);
    setRememberChoiceActive();
  }
  function toggleRememberChoice() {
    setRememberChoiceActive((prev) => !prev);
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
            {provider !== "default" && (
              <label htmlFor={`embed-choice-${baseId}`}>
                Entscheidung speichern
                <input
                  type="checkbox"
                  id={`embed-choice-${baseId}`}
                  checked={rememberChoiceActive}
                  onChange={(e) => {
                    toggleRememberChoice();
                  }}
                />
              </label>
            )}
          </div>
        </div>
      )}
      {isActive && (
        <>
          <div className={styles.iframeContainer} style={embedStyles}>
            <iframe
              title={title}
              src={url}
              frameBorder="0"
              allowFullScreen
              loading="lazy"
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
  return <Embed provider="vimeo" width={width} height={height} url={src} caption={caption} />;
}

function Youtube({ url, title, caption, width, height }) {
  const matches = url.match(/(?:youtube.com\/watch\?v=)(.+)/);
  return (
    <Embed
      width={width}
      height={height}
      title={title}
      url={`https://www.youtube-nocookie.com/embed/${matches[1]}`}
      caption={caption}
      provider="youtube"
    />
  );
}

export { Vimeo, Youtube, Embed };
