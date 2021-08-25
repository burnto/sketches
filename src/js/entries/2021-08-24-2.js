export default (p) => {

  const getHeight = () => {
    return p.currentWidth();
  }

  p.setup = () => {
    p.createCanvas(p.currentWidth(), getHeight(), p.WEBGL);
    p.frameRate(30)
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();
    p.lights();

    const startColor = p.color(255, 128 * (1 + Math.cos(Math.PI * 2 * p.frameCount / 100) / 2), 127 + 128 * (1 + Math.sin(Math.PI * 2 * p.frameCount / 100) / 2));
    const endColor = p.color(128 * (1 + Math.sin(Math.PI * 2 * p.frameCount / 100) / 2), 128, 127 + 128 * (1 + Math.cos(Math.PI * 2 * p.frameCount / 200) / 2));

    const padding = p.currentWidth() / 20;
    const w = p.currentWidth() - padding * 2;
    const h = getHeight() - padding * 2;

    const theta = (p.frameCount / 5000) * Math.PI * 2;

    p.push();
    // p.rotateX(theta * 3);
    for (var x = 0; x <= 8; x++) {
      for (var y = 0; y <= 8; y++) {
        const c = p.lerpColor(startColor, endColor, (x * y) / (21 * 21));
        p.push()
        p.fill(c);
        p.translate((x - 4) * 60, (y - 4) * 60, 0);
        p.push();
        const m = (y * 21 + x);
        p.rotateX(p.radians(m) + theta * 100);
        p.box(30, 2, 30);
        p.pop();
        p.pop();
      }
    }
  };
}
