const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const randy = require('randy');
const Sentencer = require('sentencer');

function generateTitle(filename) {
  var md5sum = crypto.createHash('md5').update(filename).digest('binary');
  randy.setState({
    seed: Array.from(md5sum + md5sum).map(c => c.charCodeAt(0)),
    idx: 0,
  });
  const t = randy.choice([
    "{{an_adjective}} {{ noun }}",
    "{{adjective}} {{noun}}",
    "{{adjective}} {{nouns}}",
    "the {{adjective}} {{ noun }}",
    "the {{ noun }}",
    "the {{ nouns }}",
    "{{ a_noun }} and {{a_noun}}",
    "{{a_noun}}",
    "{{nouns}}",
    "{{adjective}} and {{adjective}}",
  ])
  return Sentencer.make(t)
}

module.exports = function () {
  const entriesPath = path.join(__dirname, '..', 'js', 'entries',)
  const fileNames = fs.readdirSync(entriesPath);
  const sketchNames = fileNames
    .filter(f => !f.match('-draft'))
    .map((f) => {
      const baseFilename = f.replace(/.(?:js|ts)/, '');
      const title = generateTitle(f);
      return {
        title: title,
        baseFilename: baseFilename,
        filename: f,
      };
    });

  sketchNames.sort((n1, n2) => {
    let f1 = n1.baseFilename;
    let f2 = n2.baseFilename;
    if (f1.length === 10) {
      f1 += "-0";
    }
    if (f2.length === 10) {
      f2 += "-0";
    }
    return f2.localeCompare(f1, 'en', { sensitivity: 'base' });
  })

  return sketchNames;
}

