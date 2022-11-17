import React from "react";
import Footer from "./Footer";
import "./global.scss";

function App(props) {
  return (
    <body lang="de-DE">
      {props.children}
      <Footer />
    </body>
  );
}

export default App;
