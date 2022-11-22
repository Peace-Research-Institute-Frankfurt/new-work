import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const EmbedChoicesContext = createContext();

export const EmbedChoicesProvider = function ({ children }) {
  const [embedChoices, setEmbedChoices] = useLocalStorage("embedChoices", {});

  const toggleEmbedChoice = (provider) => {
    setEmbedChoices((prevChoices) => {
      const newChoices = { ...prevChoices };
      if (provider in newChoices) {
        newChoices[provider] = !newChoices[provider];
      } else {
        newChoices[provider] = true;
      }
      return newChoices;
    });
  };
  return <EmbedChoicesContext.Provider value={{ embedChoices, toggleEmbedChoice }}>{children}</EmbedChoicesContext.Provider>;
};
