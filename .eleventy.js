module.exports = function (eleventyConfig) {

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  eleventyConfig.setUseGitIgnore(false); // Because content/css is generated, thus in .gitignore
  eleventyConfig.addPassthroughCopy("content/css/*.css");
  eleventyConfig.addPassthroughCopy("content/images/**/*");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.png");

  let markdownIt = require("markdown-it")({ html: true, typographer: true, quotes: ['«\xA0', '\xA0»', '‘', '’'] })
      .use(require("markdown-it-attrs"))
      .use(require("markdown-it-header-sections"))
      .use(require("markdown-it-footnote"))
      .use(require("markdown-it-image-figures"), { figcaption: true });
  eleventyConfig.setLibrary("md", markdownIt);

  return {
    templateFormats: ["html", "md"],
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../layouts", // Relative to input
      data: "data", // Relative to input
      output: "dist",
    }
  }
};