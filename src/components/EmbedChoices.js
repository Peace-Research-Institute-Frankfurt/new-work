import React, { useState, useContext, useId } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { EmbedChoicesContext } from "./EmbedChoicesContext";
import * as styles from "./EmbedChoices.module.scss";

export default function EmbedChoices() {
  const data = useStaticQuery(graphql`
    query {
      providers: allEmbedProvidersJson {
        nodes {
          description
          provider
          title
        }
      }
    }
  `);
  const baseId = useId();
  const [isActive, setIsActive] = useState(false);
  const { embedChoices, toggleEmbedChoice } = useContext(EmbedChoicesContext);

  const providers = data.providers.nodes.map((p, i) => {
    const inputId = `${baseId}-choice-${i}`;
    if (p.provider !== "default") {
      let isActive = false;
      if (embedChoices[p.provider] === true) {
        isActive = true;
      }
      return (
        <li key={`${baseId}-${i}`}>
          <label htmlFor={inputId} className={styles.choice}>
            {p.title}
            <input
              className={styles.checkbox}
              type="checkbox"
              id={inputId}
              checked={isActive}
              onChange={(e) => {
                toggleEmbedChoice(p.provider);
              }}
            />
          </label>
        </li>
      );
    }
  });

  return <ul className={styles.container}>{providers}</ul>;
}
