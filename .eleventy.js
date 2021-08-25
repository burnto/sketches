let Nunjucks = require("nunjucks");

module.exports = (config) => {
  config.addPassthroughCopy("src/entries");
  config.addPassthroughCopy("src/load.js");

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );

  config.setLibrary("njk", nunjucksEnvironment);

  config.addWatchTarget("./src/_includes");

  return {
    dir: {
      input: "src",
      // output: "public"
    }
  }
};