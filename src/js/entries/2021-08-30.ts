import { Color } from "p5";
import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";
// const p5func = require("../lib/p5.func");

let sketch = (p: MyP5) => {
  const padding = 40;
  const startX = padding;
  const startY = padding;
  const iters = 30;
  const frameRate = 30;

  let endColor = p.color(180, 0, 180, 255);
  let startColor = p.color(0, 180, 220, 255);

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.background(0);
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

    // p.animLoop.noiseFrequency(0.4);
    p.background(0);
    p.strokeWeight(1);
  };

  p.draw = () => {
    const w = p.currentWidth() - padding * 2;
    const h = p.currentWidth() - padding * 2;
    p.background(0, 0, 0, 20);
    p.strokeWeight(10);
    p.stroke(255);

    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor, endColor, i / iters);
      p.stroke(c);
      // p.beginShape();
      for (let x = -10; x < p.width + 10; x += 10) {
        // p.animLoop.progress *
        const theta =
          2 * Math.PI * p.animLoop.progress +
          (Math.PI * x) / w +
          (Math.PI * i) / iters;
        p.point(x, p.height / 2 + (p.height / 2) * Math.sin(theta));
      }
      // p.endShape();
    }
  };
};

export default sketch;
