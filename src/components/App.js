import React from "react";
import Footer from "./Footer";
import "./global.scss";

function App(props) {
  return (
    <>
      {props.children}
      <Footer />
    </>
  );
}

export function Head({ data }) {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/asu6wbi.css" />
    </>
  );
}

export default App;
