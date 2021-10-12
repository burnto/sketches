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
  const startLoop = 6;

  let t = 0;
  let gif: P5.Image;
  p.preload = () => {
    gif = p.loadImage("/static/purblind-gong.gif");
  };

  p.setup = () => {
    const size = Math.min(400, p.currentWidth());
    p.createCanvas(size, size);
    p.background(0);
    p.pixelDensity(1);
    p.frameRate(frameRate);
    let gif;
    if (hashContains("gif")) {
      gif = {
        options: { quality: 5, width: p.width, height: p.height },
        fileName: "bloc-out.gif",
        startLoop: startLoop,
        endLoop: startLoop + duration,
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
      if (Math.random() < 1) {
        const f = Math.floor(p.frameCount);
        // @ts-ignore
        gif.setFrame(f % gif.numFrames());
        gif.loadPixels();
        for (let i = 0; i < gif.pixels.length; i++) {
          if (Math.random() < 0.1) {
            for (let j = 0; j < 3; j++) {
              gif.pixels[i] = gif.pixels[i - 2 * p.width * 4] || 0;
            }
          }
          if (Math.random() < 0.1) {
            // for (let j = 0; j < 3; j++) {
            gif.pixels[i] = gif.pixels[i + 2 * p.width * 4] || 0;
            // }
          }
        }
        gif.updatePixels();
        p.copy(gif, 0, 0, gif.width, gif.height, 0, 0, p.width, p.height);
      }

      return;
    } else {
      pauseUntil = 0;
      if (
        p.frameCount > 2 &&
        Math.random() < chanceOfPause &&
        p.animLoop.progress < 0.98
      ) {
        pauseUntil = p.millis() + randomInt(minPause, maxPause);
        p.blendMode(p.BLEND);
        return;
      } else {
      }
    }

    let thresh = 0.9;

    p.blendMode(p.SCREEN);
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
