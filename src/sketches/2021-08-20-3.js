let sketch = (p) => {

  const w = 600;
  const h = 600;
  const iters = 20000;
  const r = 700;

  let startColor = p.color(255, 128, 0, 10)
  let endColor = p.color(128, 0, 255, 10)

  p.setup = () => {
    p.createCanvas(w, h);
    p.background(255);

    for (var i = 0; i < iters; i++) {
      let color = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(color);
      p.line(
        w / 2,
        h / 2,
        w / 2 + r * Math.sin(i * 2 * Math.PI / iters),
        w / 2 + r * Math.cos(i * 2 * Math.PI / iters),
      );
    }
  }
}

export default sketch;