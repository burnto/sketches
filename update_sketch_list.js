const fs = require('fs');

fs.readdir('./src/sketches', (err, f) => {
  const s = JSON.stringify(f, null, 2);
  fs.writeFileSync('./src/sketches.json', s);
})

