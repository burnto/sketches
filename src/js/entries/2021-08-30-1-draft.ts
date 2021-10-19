import { Color } from "p5";
import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";
// const p5func = require("../lib/p5.func");

let sketch = (p: MyP5) => {
  const padding = 40;
  const frameRate = 30;
  let bgColor = p.color(220);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(bgColor);
    p.frameRate(frameRate);
    p.noFill();

    let gif;
    if (hashContains("gif")) {
      gif = {
        options: { quality: 5 },
        fileName: "bloc-out.gif",
        startLoop: 1,
        endLoop: 2,
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      gif,
    });
    p.animLoop.noiseFrequency(0.1);

    // p.animLoop.noiseFrequency(0.4);
    p.background(bgColor);
    p.strokeWeight(1);
  };

  p.draw = () => {
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;
    p.background(bgColor);
    p.strokeWeight(1);
    p.stroke(255);

    p.beginShape();
    for (let x = -10; x < p.width + 10; x += 10) {
      p.curveVertex(
        x,
        p.height / 2 +
          (p.height / 2 - padding) *
            Math.cos(p.animLoop.theta + (2 * Math.PI * x) / p.width)
      );
    }
    p.endShape();

    p.beginShape();

    p.endShape();
  };
};

export default sketch;
