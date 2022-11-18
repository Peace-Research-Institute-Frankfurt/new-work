import React, { useState } from "react";
import Figure from "./Figure";
import Quote from "./Quote";
import File from "./File";
import Leadin from "./Leadin";
import { MDXProvider } from "@mdx-js/react";

const shortCodes = { Figure, Quote, File, Leadin };

export default function PostBody({ children }) {
  return <MDXProvider components={shortCodes}>{children}</MDXProvider>;
}
