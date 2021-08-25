let sketch = (p) => {
  const padding = 40;
  const startX = padding;
  const startY = padding;
  const iters = 50;
  const framesPerCycle = 1000;

  let endColor = p.color(0, 0, 180, 100);
  let startColor = p.color(0, 180, 180, 100);

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.background(255);
    p.noFill();
    p.stroke(0, 0, 0, 100);
    p.strokeWeight(0.5);
    p.noFill;
  };

  p.draw = () => {
    const w = p.currentWidth() - padding * 2;
    const h = p.currentWidth() - padding * 2;
    p.background(240, 240, 240);
    for (let i = 0; i < iters; i++) {
      const th = i * Math.PI * 2 / iters;
      const x = w / 2 + (Math.sin(th) * w / 2);
      const y = h / 2 + (Math.cos(th) * h / 2);

      p.push();
      p.translate(padding + x, padding + y);
      for (let j = 0; j < iters; j++) {

        const th2 = (p.frameCount / 1000) + 2 * Math.PI * j / iters;
        const color = p.lerpColor(startColor, endColor, j / iters)
        p.stroke(color);
        p.push();
        p.rotate(th2);
        p.line(0, 0, 500, 0);
        p.pop();
      }
      p.pop();
    }
  }
}



export default sketch;