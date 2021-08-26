let Nunjucks = require("nunjucks");
const format = require('date-fns/format')

module.exports = (config) => {

  config.addWatchTarget("./src/**/*");
  config.addWatchTarget("./src/_includes");
  // let nunjucksEnvironment = new Nunjucks.Environment(
  //   new Nunjucks.FileSystemLoader("src/_includes")
  // );

  // add `date` filter
  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  // config.setLibrary("njk", nunjucksEnvironment);

  return {
    dir: {
      input: "src",
    }
  }
};