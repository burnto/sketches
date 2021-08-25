let sketch = (p) => {

  const padding = 40;
  const startX = padding;
  const startY = padding;
  const iters = 30;
  const framesPerCycle = 1000;

  let endColor = p.color(0, 0, 180, 200);
  let startColor = p.color(0, 180, 220, 100);


  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.background(0);
    p.frameRate(60);
    p.noFill();
  };

  p.draw = () => {
    const w = p.currentWidth() - padding * 2;
    const h = p.currentWidth() - padding * 2;
    p.background(0);
    const f = p.frameCount % framesPerCycle;
    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(c);
      p.strokeWeight(1);
      p.beginShape();
      for (let x = 0; x < w; x++) {
        const theta = (2 * Math.PI * x / w) + (p.frameCount / 100 * 2 * Math.PI * i / iters) //* Math.sin(2 * Math.PI * p.frameCount / 1000);
        const theta2 = (Math.PI * (w - x) / w);
        const y = h / 2 + Math.sin(theta) * (h / 2) * (Math.sin(theta2));
        p.curveVertex(padding + x, padding + y);
      }
      p.endShape();
    }
  }
}

export default sketch;
