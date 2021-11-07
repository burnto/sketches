import { MyP5, FuncP5 } from "../types";
import P5 from "p5";

import { hashContains, randomInt } from "../helpers.js";
import Func from "p5.js-func";

Func(P5);
const p5 = P5 as unknown as FuncP5;
const gen = new p5.Gen();


let sketch = (p: FuncP5) => {
  const duration = 5;
  const frameRate = 30;

  let t = 0;

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
      duration,
    });
    p.background(255);
    t = p.millis();
  };

  const chanceOfPause = 1 / 4;
  const minPause = 500;
  const maxPause = 2000;
  let pauseUntil = 0;

  p.draw = () => {
    const dt = p.millis() - t;
    const isPaused = pauseUntil > 0 && p.millis() < pauseUntil;

    let thresh = 0.9;

    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let choice = Math.random();
        if (choice < thresh) {
          p.set(x, y, 0x000000);
        
        } else {
          p.set(x, y, 0xffffff);
        }
      }
    }


    if (p.animLoop.progress < 0.95 && isPaused) {
      p.loadPixels();
      for (let i = 0; i < p.pixels.length; i++) {
        if (Math.random() < 0.9) {
          p.pixels[i] = p.pixels[i + 4] || 0;
          p.pixels[i + 1] = p.pixels[i + 7] || 0;
          p.pixels[i + 2] = p.pixels[i + 9] || 0;
          p.pixels[i + 3] = p.pixels[i + 16] || 0;
        }
        if (Math.random() < 0.2) {
          p.pixels[i] = p.pixels[i + 2 * 4 * p.width] || 0;
        }
        if (pauseUntil % 2 === 0 && Math.random() < 0.1) {
          p.pixels[i] = p.pixels[i - 4 * p.width] || 0;
          p.pixels[i + 1] = p.pixels[i - 4 * p.width + 1] || 0;
          p.pixels[i + 2] = p.pixels[i - 4 * p.width + 2] || 0;
          p.pixels[i + 3] = p.pixels[i - 4 * p.width + 3] || 0;
        }

        if (Math.random() < 0.4) {
          p.pixels[i] = p.pixels[i - 2] || 0;
          p.pixels[i] = p.pixels[i - 4] || 0;
          p.pixels[i] = p.pixels[i - 6] || 0;
        }
      }
      for (let x = 0; x < p.width; x++) {
        if (Math.random() < 0.001) {
          let maxX = x + randomInt(1, p.width/50);
          for (; x < p.width && x < maxX; x++) {
            for (let y = 0; y < p.height; y++) {
              let i = y * p.width * 4 + x * 4;
              p.pixels[i] = Math.abs(255 - p.pixels[i]);
              p.pixels[i + 1] = randomInt(0, 255);
              p.pixels[i + 2] = randomInt(0, 255);
              p.pixels[i + 3] = randomInt(0, 255);
            }
          }
        }
      }

      for (let y = 0; y < p.width; y++) {
        if (Math.random() < 0.0008) {
          let maxY = y + randomInt(1, p.width/200);
          for (; y < p.width && y < maxY; y++) {
            for (let x = 0; x < p.height; x++) {
              let i = y * p.width * 4 + x * 4;
              p.pixels[i] = 0;
              p.pixels[i + 1] = 0;
              p.pixels[i + 2] = 0;
              p.pixels[i + 3] = 0;
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

    p.updatePixels();
  };
};

export default sketch;
