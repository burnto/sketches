import { MyP5, FuncP5 } from "../types";
import P5 from "p5";

import { hashContains, randomInt } from "../helpers.js";
import { paletteColors, Palettes } from "../coolers-palettes";
import Func from "p5.js-func";

Func(P5);
const p5 = P5 as unknown as FuncP5;
const gen = new p5.Gen();

let sketch = (p: FuncP5) => {
  const duration = 2;
  const frameRate = 30;

  let t = 0;

  p.setup = () => {
    const size = Math.min(400, 400);
    p.createCanvas(size, size);
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
    p.background(255);
    t = p.millis();
  };

  const chanceOfPause = 1 / 30;
  const minPause = 500;
  const maxPause = 4000;
  let pauseUntil = 0;

  p.draw = () => {
    const dt = p.millis() - t;
    const isPaused = pauseUntil > 0 && p.millis() < pauseUntil;

    if (isPaused) {
      p.loadPixels();
      for (let i = 0; i < p.pixels.length; i++) {
        if (Math.random() < 0.4) {
          p.pixels[i] = p.pixels[i + 4] || 0;
          p.pixels[i] = p.pixels[i + 8] || 0;
          p.pixels[i] = p.pixels[i + 12] || 0;
          p.pixels[i] = p.pixels[i + 16] || 0;
          p.pixels[i] = p.pixels[i + 20] || 0;
        }
        if (Math.random() < 0.4) {
          p.pixels[i] = p.pixels[i - 4] || 0;
          p.pixels[i] = p.pixels[i - 8] || 0;
          p.pixels[i] = p.pixels[i - 12] || 0;
          p.pixels[i] = p.pixels[i - 16] || 0;
          p.pixels[i] = p.pixels[i - 20] || 0;
        }
      }
      for (let x = 0; x < p.width; x++) {
        if (Math.random() < 0.0008) {
          let maxX = x + randomInt(1, 2);
          for (; x < p.width && x < maxX; x++) {
            for (let y = 0; y < p.height; y++) {
              let i = y * p.width * 4 + x * 4;
              p.pixels[i] = Math.abs(255 - p.pixels[i]);
              p.pixels[i + 1] = Math.abs(255 - p.pixels[i + 1]);
              p.pixels[i + 2] = Math.abs(255 - p.pixels[i + 2]);
              p.pixels[i + 3] = 255;
            }
          }
        }
      }

      p.updatePixels();
      return;
    } else {
      pauseUntil = 0;
      if (Math.random() < chanceOfPause) {
        pauseUntil = p.millis() + randomInt(minPause, maxPause);
      }
    }

    let thresh = 0.3;

    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let choice = Math.random();
        if (choice < thresh) {
          p.set(x, y, 0x000000);
        } else if (choice < thresh * 2) {
          p.set(x, y, 0xffffff);
        } else {
          // nothing
        }
      }
    }
    p.updatePixels();
  };
};

export default sketch;
