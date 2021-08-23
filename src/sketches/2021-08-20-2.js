let sketch = (p) => {

  const w = 600;
  const h = 600;
  const iters = 10000;

  let startColor = p.color(0, 255, 0, 10)
  let endColor = p.color(128, 0, 128, 10)

  p.setup = () => {
    p.createCanvas(w, h);
    p.background(255);

    for (var i = 0; i < iters; i++) {
      let color = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(color); // Change the color
      p.strokeWeight(2); // Make the points 10 pixels in size
      p.line(
        5 * i % w,
        h / 2 + 2 * i / h,
        Math.pow(i, 3) % w,
        Math.pow(i, 2) % h
      );
      // p.filter(BLUR, 3);
    }
  }
}

export default sketch;