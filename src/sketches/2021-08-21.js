let sketch = (p) => {

  const padding = 40;
  const iters = 40;
  const startX = padding;
  const startY = padding;

  let endColor = p.color(180, 0, 180, 180);
  let startColor = p.color(10, 0, 120, 100);

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noFill();
  };

  p.draw = () => {
    const w = p.currentWidth() - padding * 2;
    const h = p.currentWidth() - padding * 2;
    p.background(0);

    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(c);
      p.strokeWeight(1);
      p.beginShape();
      for (let x = 0; x < w; x++) {
        const theta = (2 * Math.PI * x / w) + (2 * Math.PI * i / iters);
        const theta2 = (Math.PI * (w - x) / w);
        const y = h / 2 + Math.sin(theta) * (h / 2) * (Math.sin(theta2));
        p.curveVertex(padding + x, padding + y);
      }
      p.endShape();
    }
  }
}

export default sketch;
