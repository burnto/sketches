import { MyP5 } from "../types";

const sketch = (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth(), p.WEBGL);
    p.createDiv("Creative direction by Cade (age 6)");
    p.colorMode(p.HSB, 1, 1, 1, 1);
    p.noStroke();
  };

  p.draw = () => {
    p.lights();
    p.background(0.9, 0.9, 0.5, 1);

    p.rotateX((Math.PI * 2) / 100 + p.frameCount / 2000);
    for (var i = 0; i < 100; i++) {
      p.push();
      p.rotateX((i * Math.PI * 2) / 100 + p.frameCount / 500);
      p.rotateY((i * Math.PI * 2) / 100 + p.frameCount / -100);
      p.rotateZ((i * Math.PI * 2) / 100 + p.frameCount / 40);

      // triangle
      p.push();
      p.translate(-150, -150);
      p.rotate((Math.PI * 2 * p.frameCount) / 1000);
      p.fill(0.3, 1, 0.7, 0.5);
      p.triangle(-30, -100, 30, -100, 0, 100);
      p.pop();

      // circle
      p.push();
      p.translate(150, -150);
      p.fill(0.1, 1, 0.9, 0.4);
      p.circle(0, 0, 80);
      p.pop();

      // box
      p.push();
      p.translate(0, 150);
      p.fill(0.6, 1, 0.3, 0.5);
      p.square(-50, 50, 100);
      p.pop();
      p.pop();
    }
  };
};

export default sketch;
