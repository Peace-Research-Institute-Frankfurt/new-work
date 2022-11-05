require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `New Work`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: `${__dirname}/content/authors/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          // remarkPlugins: [require("remark-gfm")],
          // rehypePlugins: [wrapESMPlugin("rehype-slug")],
        },
        // gatsbyRemarkPlugins: ["gatsby-remark-smartypants", "gatsby-plugin-remark-footnotes"],
      },
    },
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        mode: "async",
        enableListener: false,
        preconnect: ["https://use.typekit.net"],
        web: [
          {
            name: "haas",
            file: `https://use.typekit.net/${process.env.TYPEKIT_PROJECT_ID}.css`,
          },
        ],
      },
    },
  ],
};
