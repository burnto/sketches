let sketch = (p) => {

  let r = 0, g = 0, b = 0;
  const w = 500;
  const h = 500;
  const iters = 1000;

  p.setup = () => {
    p.createCanvas(w, h);
    p.background(255);
    p.frameRate(60);
    p.noStroke();
    p.colorMode(p.RGB, 255, 255, 255, 1);
    p.blendMode(p.MULTIPLY);
    for (var f = 0; f < iters; f++) {

      let angle1 = f / w * 2 * Math.PI;
      let angle2 = f / h * 2 * Math.PI;

      let rad1 = w * (f / iters) / 2;
      let rad2 = h * (f / iters) / 3;

      let from = p.color(10, 4, 255, 0.01);
      let to = p.color(128, 4, 10, 0.01);
      let i = 0.5 + Math.sin((f / iters) * Math.PI * 2) / 2;

      let c = p.lerpColor(from, to, i);
      console.log(p.alpha(c));

      let x = w / 2 + (rad1 * Math.cos(angle1));
      let y = h / 2 + (rad2 * Math.cos(angle2));

      let ew = w / 10 + (rad1 * Math.cos(angle1));
      let eh = h / 10 + (rad2 * Math.sin(angle2));

      p.fill(c);
      p.ellipse(x, y, ew, eh);
      f = f + 1;
    }
  };
}

export default sketch;