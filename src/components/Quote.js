import React from "react";
import * as QuoteStyles from "./Quote.module.scss";
export default function Quote(props) {
  return (
    <blockquote>
      <div className={QuoteStyles.text}>{props.children}</div>
      <cite>{props.cite}</cite>
    </blockquote>
  );
}
