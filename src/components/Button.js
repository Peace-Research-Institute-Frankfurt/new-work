import React from "react";
import * as styles from "./Button.module.scss";

export default function Button({ onClick, label, as, children }) {
  if (as === "input") {
    return <input type="submit" className={styles.container} onClick={onClick} value={label}/>;
  } else {
    return (
      <button className={styles.container} onClick={onClick}>
        {children}
      </button>
    );
  }
}
