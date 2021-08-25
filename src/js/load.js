
export default (sketchImport) => {
  window.addEventListener('DOMContentLoaded', () => {
    const sketchContainer = window.document.getElementById('sketchContainer');
    sketchImport.then(s => {
      let node = document.createElement('div');
      let currentWidth = node.offsetWidth;
      sketchContainer.appendChild(node);
      let f = s.default;
      let instWrapper = (p5inst) => {
        p5inst.currentWidth = () => {
          return node.offsetWidth;
        }
        f(p5inst);
        p5inst.windowResized = () => {
          const newWidth = node.offsetWidth;
          const r = newWidth / p5inst.width;
          const newHeight = r * p5inst.height;
          p5inst.resizeCanvas(newWidth, newHeight)
        }
      }
      new p5(instWrapper, node);
    });
  });
};