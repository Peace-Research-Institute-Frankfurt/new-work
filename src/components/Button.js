import React from "react";
import * as styles from "./Button.module.scss";

export default function Button({ onClick, label, as, children, type }) {
  const containerClasses = `${styles.container} ${type && styles[type]}`;
  if (as === "input") {
    return <input type="submit" className={containerClasses} onClick={onClick} value={label} />;
  } else {
    return (
      <button className={containerClasses} onClick={onClick}>
        {children}
      </button>
    );
  }
}
