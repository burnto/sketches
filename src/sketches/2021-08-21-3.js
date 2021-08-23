let sketch = (p) => {

  const totalWidth = 600;
  const totalHeight = 600;
  const padding = 40;
  const w = totalWidth - padding * 2;
  const h = totalHeight - padding * 2;
  const startX = padding;
  const startY = padding;
  const iters = 50;
  const framesPerCycle = 1000;

  let endColor = p.color(0, 0, 180, 200);
  let startColor = p.color(0, 180, 180, 0);

  p.setup = () => {
    p.createCanvas(totalWidth, totalHeight);
    p.background(255);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);

    for (let i = 0; i < iters; i++) {
      for (let j = 0; j < iters; j++) {
        const th = i * Math.PI * 2 / iters;
        const x = w / 2 + (Math.sin(th) * w / 4);
        const y = h / 2 + (Math.cos(th) * h / 4);
        p.point(padding + x, padding + y);
      }
    }
  }
}

export default sketch;
