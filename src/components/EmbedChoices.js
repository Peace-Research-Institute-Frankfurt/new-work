import React, { useContext, useId } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { EmbedChoicesContext } from "../context/EmbedChoicesContext";
import * as styles from "./EmbedChoices.module.scss";

export default function EmbedChoices() {
  const data = useStaticQuery(graphql`
    query {
      providers: allEmbedProvidersJson(filter: { provider: { ne: "default" } }) {
        nodes {
          description
          provider
          title
        }
      }
    }
  `);
  const baseId = useId();
  const { embedChoices, setEmbedChoices } = useContext(EmbedChoicesContext);

  const handleChange = (e, provider) => {
    setEmbedChoices((prev) => {
      let newChoices = { ...prev };
      newChoices[provider] = e.target.checked;
      return newChoices;
    });
  };

  const providers = data.providers.nodes.map((p, i) => {
    const inputId = `${baseId}-choice-${i}`;
    return (
      <li key={`${baseId}-${i}`}>
        <label htmlFor={inputId} className={styles.choice}>
          {p.title}
          <input
            className={styles.checkbox}
            id={inputId}
            type="checkbox"
            checked={embedChoices[p.provider] || false}
            onChange={(e) => {
              handleChange(e, p.provider);
            }}
          />
        </label>
      </li>
    );
  });

  return <ul className={styles.container}>{providers}</ul>;
}
