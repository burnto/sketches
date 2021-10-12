let Nunjucks = require("nunjucks");
const format = require('date-fns/format')

module.exports = (config) => {

  config.addWatchTarget("./src/**/*");
  config.addWatchTarget("./src/_includes");
  config.addPassthroughCopy("static");

  // add `date` filter
  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  return {
    dir: {
      input: "src",
    }
  }
};