import p5 from "p5";

const sketchImports = [
  import("./2021-08-20-3"),
  import("./2021-08-20-2"),
  import("./2021-08-20-1"),
  import("./2021-08-20")
];

window.addEventListener('DOMContentLoaded', () => {
  const container = window.document.getElementById('container');
  Promise.all(sketchImports).then(sketches => {
    sketches.forEach(s => {
      let node = document.createElement('div');
      container.appendChild(node);
      new p5(s.default, node);
    })
  });
});

