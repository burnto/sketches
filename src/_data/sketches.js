const fs = require('fs');
const path = require('path');

module.exports = function () {
  const sketchesPath = path.join(__dirname, '..', 'sketches')
  const fileNames = fs.readdirSync(sketchesPath);
  const sketchNames = fileNames.map((f) => {
    return f.replace('.js', '');
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

