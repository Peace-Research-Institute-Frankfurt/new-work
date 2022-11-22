import React from "react";
import Figure from "./Figure";
import Quote from "./Quote";
import File from "./File";
import Leadin from "./Leadin";
import { Vimeo, Youtube } from "./Embed";
import { MDXProvider } from "@mdx-js/react";
import EmbedChoices from "./EmbedChoices";

const shortCodes = { Figure, Quote, File, Leadin, Vimeo, Youtube, EmbedChoices };

export default function PostBody({ children }) {
  return <MDXProvider components={shortCodes}>{children}</MDXProvider>;
}
