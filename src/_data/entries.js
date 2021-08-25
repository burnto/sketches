const fs = require('fs');
const path = require('path');

module.exports = function () {
  const entriesPath = path.join(__dirname, '..', 'js', 'entries',)
  const fileNames = fs.readdirSync(entriesPath);
  const sketchNames = fileNames
    .filter(f => !f.match('-draft'))
    .map((f) => {
      return f.replace(/.(?:js|ts)/, '');
    });
  sketchNames.sort((n1, n2) => {
    if (n1.length === 10) {
      n1 += "-0";
    }
    if (n2.length === 10) {
      n2 += "-0";
    }
    return n2.localeCompare(n1, 'en', { sensitivity: 'base' });
  })

  return sketchNames;
}

