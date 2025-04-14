import * as yaml from "js-yaml"
import markdownItAttrs from "markdown-it-attrs"
import markdownItHeaderSections from "markdown-it-header-sections"
import markdownItFootnote from "markdown-it-footnote"
import markdownItImageFigures from "markdown-it-image-figures"

export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false) // Because content/css is generated, thus in .gitignore

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value))

  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents))
  eleventyConfig.addPassthroughCopy("content/**/*.(css|jpg|png|svg)")

  eleventyConfig.amendLibrary("md", (md) => {
    md.quotes = ["«\xA0", "\xA0»", "‘", "’"]
    md.use(markdownItAttrs)
      .use(markdownItHeaderSections)
      .use(markdownItFootnote)
      .use(markdownItImageFigures, { figcaption: true, lazy: true })
  })

  return {
    templateFormats: ["html", "md"],
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../layouts", // Relative to input
      output: "dist",
    },
  }
}
