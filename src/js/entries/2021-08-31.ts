import { Color } from "p5";
import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";

let sketch = (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.background(255);
    p.noFill();
    p.stroke(0, 0, 0, 100);
    p.strokeWeight(0.25);

    let gif;
    if (hashContains("gif")) {
      console.log("gif enabled");
      gif = {
        options: { quality: 5 },
        fileName: "bloc-out.gif",
        startLoop: 1,
        endLoop: 2,
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.frameRate(30);
    p.createLoop({
      gif,
      framesPerSecond: 30,
      duration: 5,
    });
  };

  const numRays = 60;
  const numPoints = 70;
  let endColor = p.color(0, 200, 128, 128);
  let startColor = p.color(0, 99, 200, 100);

  p.draw = () => {
    // console.log(p.animLoop.theta);
    const w = p.currentWidth();
    const h = p.currentWidth();
    p.background(240, 240, 240);
    for (let i = 0; i < numPoints; i++) {
      const th = (i * Math.PI * 2) / numPoints;
      const x = w / 2 + (3 * (Math.sin(th) * w)) / 4;
      const y = h / 2 + (3 * (Math.cos(th) * h)) / 4;

      p.push();
      p.translate(x, y);
      for (let j = 0; j < numRays; j++) {
        const th2 =
          p.animLoop.theta / (numRays / 2) + (2 * Math.PI * j) / numRays;
        // const color = p.lerpColor(startColor, endColor, j / numRays);
        const color = j % 2 === 0 ? startColor : endColor;
        p.stroke(color);
        p.push();
        p.rotate(th2);
        p.line(0, 0, 1000, 0);
        p.pop();
      }
      p.pop();
    }
  };
};

export default sketch;
