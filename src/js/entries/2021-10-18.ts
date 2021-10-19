import { MyP5 } from "../types";

import { hashContains, randomInt } from "../helpers.js";
import { paletteColors, Palettes } from "../coolers-palettes";

let sketch = (p: MyP5) => {
  const duration = 2;
  const frameRate = 30;

  const C = "#00FFFF";
  const M = "#FF00FF";
  const Y = "#FFFF00";
  const K = "#000000";
  const W = "#ffffff";
  const colors = [C, M, Y, K, W];

  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(30);
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
    let i = Math.floor((p.animLoop.progress * duration * frameRate) / 4);
    let offset = p.animLoop.progress * 18;
    p.background(30);
    for (let x = 0; x < p.width + 20; x += 18) {
      for (let y = 0; y < p.height + 20; y += 18) {
        p.fill(0);
        p.strokeWeight(2);
        p.stroke(colors[(x + y + i) % colors.length]);
        p.push();
        p.translate(x + offset - r(), y + offset - r());
        p.push();
        p.rotate(r() - 0.25);
        p.translate(-4.5, -4.5);
        p.rect(0, 0, 8 + r(), 8 + r());
        p.pop();
        p.pop();
      }
    }
  };
};

export default sketch;
