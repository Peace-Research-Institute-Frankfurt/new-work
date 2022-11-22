import React from "react";
import { EmbedChoicesProvider } from "./src/components/EmbedChoicesContext";

export const wrapRootElement = ({ element }) => {
  return <EmbedChoicesProvider>{element}</EmbedChoicesProvider>;
};
