import React from "react";

function Embed(props) {
  return (
    <figure>
      <div className="embedContainer">{props.children}</div>
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}

function Vimeo(props) {
  return <Embed>This is a vimeo embed</Embed>;
}
function Youtube(props) {
  return <Embed>This is a youtube embed</Embed>;
}

export { Vimeo, Youtube };
