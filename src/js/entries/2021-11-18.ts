import { MyP5 } from "../types";
import p5 from "p5";
import { hashContains } from "../helpers";

let sketch = (p: MyP5) => {
  p.colorMode(p.HSB, 1, 1, 1, 1);
  const duration = 4;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(30);
    p.strokeWeight(1);
    p.noFill();
    p.pixelDensity(1);

    let gif;
    if (hashContains("gif")) {
      gif = {
        startLoop: 1,
        endLoop: 1 + duration,
        fileName: "camps",
        options: {
          quality: 5,
        },
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      duration,
      gif,
    });
  };

  let triSide: number, triHeight: number;

  const tritri = (rotSeed: number) => {
    for (let i = 0; i < 3; i++) {
      p.push();
      p.rotate((i / 3) * 2 * Math.PI);
      p.rotate(p.animLoop.theta + (Math.PI / 12) * (rotSeed + i), [0, 1, 0]);
      p.translate(0, triHeight / 3);

      const h =
        0.7 +
        0.2 * Math.sin(p.animLoop.theta + (Math.PI / 3) * (2 * rotSeed + i)); //(rotSeed - i) / 200 + (p.animLoop.progress % 1);
      const s =
        0.75 +
        0.25 * Math.sin(p.animLoop.theta + (Math.PI / 2) * (rotSeed + i));
      const b =
        0.5 +
        0.5 *
          Math.cos(
            p.animLoop.theta +
              (Math.PI / (20 + 10 * Math.sin(p.animLoop.theta))) * (rotSeed + i)
          );
      p.stroke(h, s, b);
      p.square(-triSide / 2, 0, triSide / 2, 0, 0, triHeight);
      p.pop();
    }
  };

  p.draw = () => {
    triSide = p.width / 30;
    triHeight = (triSide * p.sqrt(3)) / 2;
    const tritriSide = 2 * triSide;
    const dim = 20;

    p.background(0);
    p.stroke(0.1, 1, 1.9);
    let originX = tritriSide * -((dim - 1) / 2);
    let originY = triHeight * 2 * -((dim - 1) / 2);
    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        p.push();
        p.translate(originX + x * tritriSide, originY + y * triHeight * 2);
        tritri(y * x);
        p.pop();
      }
    }
    p.push();
    p.rotate(Math.PI);
    p.translate(0, triHeight / 3);
    originX = tritriSide * -((dim - 1) / 2);
    originY = triHeight * -dim;
    for (let x = 0; x < dim - 1; x++) {
      for (let y = 0; y < dim; y++) {
        p.push();
        p.translate(originX + x * tritriSide, originY + y * triHeight * 2);
        tritri(y * x);
        p.pop();
      }
    }
    p.pop();
  };
};

export default sketch;
