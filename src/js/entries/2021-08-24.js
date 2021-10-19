export default (p) => {

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.draw = () => {
    p.background(210);
    p.strokeWeight(0.5);

    const startColor = p.color(255, 255, 127 + 128 * (1 + Math.sin(Math.PI * 2 * p.frameCount / 100) / 2));
    const endColor = p.color(255, 128, 127 + 128 * (1 + Math.cos(Math.PI * 2 * p.frameCount / 200) / 2));

    const padding = p.width / 20;
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;

    const theta = (p.frameCount / 1000) * Math.PI * 2;

    p.push();
    p.rotateX(theta * 2);
    p.rotateY(theta);
    p.rotateZ(theta / 2);
    for (var x = 0; x <= 20; x++) {
      for (var y = 0; y <= 20; y++) {
        const c = p.lerpColor(startColor, endColor, (x * y) / (21 * 21));
        p.push()
        p.fill(c);
        p.translate((x - 10) * 50, (y - 10) * 50, 0);
        p.push();
        p.rotateX(theta / 2);
        p.rotateY(theta);
        p.rotateZ(theta * 2);
        p.box(8, 1, 300);
        p.pop();
        p.pop();
      }
    }
  };
}
