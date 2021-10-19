let sketch = (p) => {

  let r = 0, g = 0, b = 0;
  const iters = 1000;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(1);
    p.noStroke();
  };

  p.draw = () => {
    const w = p.width;
    const h = p.height;
    p.clear();
    p.background(255);
    p.colorMode(p.RGB, 255, 255, 255, 1);
    p.blendMode(p.MULTIPLY);
    for (var f = 0; f < iters; f++) {

      let angle1 = f / w * 2 * Math.PI;
      let angle2 = f / h * 2 * Math.PI;

      let rad1 = w * (f / iters) / 2;
      let rad2 = h * (f / iters) / 2;

      let from = p.color(200, 165, 32, 0.01);
      let to = p.color(72, 61, 139, 0.01);
      let i = 0.5 + Math.sin((f / iters) * Math.PI * 2) / 2;

      let c = p.lerpColor(from, to, i);

      let x = w / 2 + (rad1 * Math.sin(angle1));
      let y = h / 2 + (rad2 * Math.cos(angle2));

      let ew = w / 2 + (rad1 * Math.sin(angle1));
      let eh = h / 2 + (rad2 * Math.cos(angle2));

      p.fill(c);
      p.ellipse(x, y, ew, eh);
      f = f + 1;
    }
  };
}

export default sketch;