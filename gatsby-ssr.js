import React from "react";
import { EmbedChoicesProvider } from "./src/context/EmbedChoicesContext";

const HtmlAttributes = {
  lang: "de-DE",
};

export const onRenderBody = ({ setHtmlAttributes }, pluginOptions) => {
  setHtmlAttributes(HtmlAttributes);
};

export const wrapRootElement = ({ element }) => {
  return <EmbedChoicesProvider>{element}</EmbedChoicesProvider>;
};
