let Nunjucks = require("nunjucks");

module.exports = (config) => {
  config.addPassthroughCopy("src/sketches");

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );

  config.setLibrary("njk", nunjucksEnvironment);

  return {
    dir: {
      input: "src",
      // output: "public"
    }
  }
};