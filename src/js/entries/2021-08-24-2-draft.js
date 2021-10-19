export default (p) => {

  let detailX;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(30)

    detailX = p.createSlider(0, 360, 1);
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();
    p.lights();


    const startColor = p.color(255, 128, detailX.value());
    const endColor = p.color(128, 0, 255);

    const padding = p.width / 20;
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;

    const theta = (p.frameCount / 10000) * Math.PI * 2;

    p.push();
    // p.rotateX(theta * 3);
    for (var x = 0; x <= 8; x++) {
      for (var y = 0; y <= 8; y++) {
        const c = p.lerpColor(startColor, endColor, y / 9);
        p.push()
        p.fill(c);
        p.translate((x - 4) * detailX.value(), (y - 4) * detailX.value(), 0);
        p.push();
        // const m = 20 * (y * 9 + x);
        p.rotateX(p.radians(detailX.value()));
        p.box(20, 20, 20);
        p.pop();
        p.pop();
      }
    }
  };
}
