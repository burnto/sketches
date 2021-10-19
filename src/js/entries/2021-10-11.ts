import { MyP5, FuncP5 } from "../types";
import P5 from "p5";
import func from "p5.js-func";

import { hashContains } from "../helpers.js";
import { p5Colors, paletteColors, Palettes } from "../coolers-palettes";
import Func from "p5.js-func";
import { initLoop, randomChoice, randomInt, Rect } from "../helpers";

Func(P5);
const p5 = P5 as unknown as FuncP5;
const gen = new p5.Gen();

let sketch = (p: FuncP5) => {
  const padding = 0;
  const iters = 20;
  const duration = 5;
  const frameRate = 30;
  const strokeWeight = 8;
  const xIncr = 20;

  const palette = Palettes.get("reds")!;
  const colors = paletteColors(palette);

  let [bgColor, endColor1, startColor1, endColor2, startColor2] = colors.map(
    (c) => p.color(c)
  );

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.pixelDensity(1);
    p.frameRate(frameRate);
    p.noFill();

    let gif;
    if (hashContains("gif")) {
      gif = {
        options: { quality: 5, width: p.width, height: p.height },
        fileName: "bloc-out.gif",
        startLoop: 2,
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      gif,
      duration,
    });

    // p.animLoop.noiseFrequency(0.4);
    p.background(0);
  };

  p.draw = () => {
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;
    p.background(bgColor);
    p.strokeWeight(strokeWeight / 2);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(Math.PI * 0.5);
    p.translate(-p.width / 2, -p.height / 2);

    const xOffset = (Math.sin(p.animLoop.theta) * p.width) / 4;
    const yOffset = (Math.cos(p.animLoop.theta) * p.height) / 4;

    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor2, endColor2, i / iters);
      p.stroke(c);
      for (let x = -10; x < p.width + 10; x += 10) {
        const theta =
          Math.PI +
          p.animLoop.theta +
          (Math.PI * x) / w +
          (Math.PI * i * 6) / iters;
        let y = p.height / 2 + (h / 2) * Math.sin(theta);
        let v = p.createVector(5, 0);
        v.rotate(-theta + Math.PI / 2);
        v.add(x, y);
        p.line(x, y, v.x, v.y);
      }
    }
    for (let i = 0; i < iters; i++) {
      for (let x = 0; x < p.width; x += xIncr) {
        let c2 = p.lerpColor(startColor2, endColor2, x / p.width);
        let ci = Math.floor((x / p.width) * colors.length);
        const strokeColor = p.color(colors[ci]);
        // strokeColor.setAlpha(0);
        // p.stroke(strokeColor);
        p.noStroke();
        const fillColor = p.color(colors[colors.length - ci - 1]);
        fillColor.setAlpha(100);
        p.fill(fillColor);
        let yfactor = gen.window(
          p.animLoop.progress + x / p.width + i / iters,
          "hanning"
        );
        let y2 = p.height * yfactor;
        // p.point(x, y2);
        let v2 = p.createVector(50, 0);
        v2.rotate(-p.animLoop.theta);
        v2.add(x + 0, y2 + 0);
        p.push();
        p.rotate(
          p.animLoop.theta +
            (Math.PI * 2 * x) / p.width -
            (Math.PI * 2 * i) / iters
        );
        p.rect(x + 0, y2 + 0, v2.x, v2.y);
        p.pop();
      }
    }
  };
};

export default sketch;
