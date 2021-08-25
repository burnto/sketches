let Nunjucks = require("nunjucks");

module.exports = (config) => {

  config.addWatchTarget("./src/**/*");
  config.addWatchTarget("./src/_includes");
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );

  config.setLibrary("njk", nunjucksEnvironment);

  return {
    dir: {
      input: "src",
    }
  }
};