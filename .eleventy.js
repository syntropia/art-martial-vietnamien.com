module.exports = function (eleventyConfig) {

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy("content/css/*.css");

  return {
    dir: {
      input: "content",
      output: "dist",
    }
  }
};