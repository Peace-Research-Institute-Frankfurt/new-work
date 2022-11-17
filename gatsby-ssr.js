const HtmlAttributes = {
  lang: "de-DE",
};

exports.onRenderBody = ({ setHtmlAttributes }, pluginOptions) => {
  setHtmlAttributes(HtmlAttributes);
};
