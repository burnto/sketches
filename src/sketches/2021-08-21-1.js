let sketch = (p) => {

  const totalWidth = 600;
  const totalHeight = 600;
  const padding = 40;
  const w = totalWidth - padding * 2;
  const h = totalHeight - padding * 2;
  const startX = padding;
  const startY = padding;
  const iters = 20;
  const framesPerCycle = 1000;

  let endColor = p.color(180, 0, 180, 180);
  let startColor = p.color(10, 0, 120, 100);

  p.setup = () => {
    p.createCanvas(totalWidth, totalHeight);
    p.background(0);
    p.noFill();
  };

  p.draw = () => {
    p.background(0);
    const f = p.frameCount % framesPerCycle;
    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(c);
      p.strokeWeight(1);
      p.beginShape();
      for (let x = 0; x < w; x++) {
        const theta = (2 * Math.PI * x / w) + (2 * Math.PI * i / iters) * Math.sin(2 * Math.PI * f / framesPerCycle);
        const theta2 = (Math.PI * (w - x) / w);
        const y = h / 2 + Math.sin(theta) * (h / 2) * (Math.sin(theta2));
        p.curveVertex(padding + x, padding + y);
      }
      p.endShape();
    }
  }
}

export default sketch;
