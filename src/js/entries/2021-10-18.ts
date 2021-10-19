import { MyP5 } from "../types";

import { hashContains, randomInt } from "../helpers.js";
import { paletteColors, Palettes } from "../coolers-palettes";

let sketch = (p: MyP5) => {
  const duration = 2;
  const frameRate = 10;

  const C = "#00FFFF";
  const M = "#FF00FF";
  const Y = "#FFFF00";
  const K = "#000000";
  const colors = [C, M, Y, K];

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.pixelDensity(1);
    p.frameRate(frameRate);
    let gif;
    if (hashContains("gif")) {
      gif = {
        options: { quality: 5, width: p.width, height: p.height },
        fileName: "bloc-out.gif",
        startLoop: 1,
        endLoop: 1 + duration,
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      gif,
    });
    p.background(0);
    p.noStroke();
  };

  const r = () => {
    return Math.random() / 2;
  };

  let i = 0;
  p.draw = () => {
    p.background(0);
    for (let x = 0; x < p.width - 20; x += 20) {
      for (let y = 0; y < p.height - 20; y += 20) {
        p.fill(0);
        p.strokeWeight(2);
        p.stroke(colors[i++ % 4]);
        p.push();
        p.translate(x + 10 - r(), y + 10 - r());
        p.rotate((r() - 0.25) / 2);
        p.rect(0, 0, 8 + r(), 8 + r());
        p.pop();
      }
    }
  };
};

export default sketch;
