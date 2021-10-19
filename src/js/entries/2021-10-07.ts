import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";
import { p5Colors, paletteColors, Palettes } from "../coolers-palettes";

let sketch = (p: MyP5) => {
  const padding = 0;
  const iters = 20;
  const frameRate = 30;
  const strokeWeight = 1;

  const palette = Palettes.get("space")!;
  const colors = paletteColors(palette);

  let endColor1 = p.color(colors[0]);
  let startColor1 = p.color(colors[2]);
  let endColor2 = p.color(colors[1]);
  let startColor2 = p.color(colors[3]);
  let bgColor = p.color(colors[4]);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.pixelDensity(1);
    p.frameRate(frameRate);
    p.noFill();

    let gif;
    if (hashContains("gif")) {
      gif = {
        options: { quality: 5 },
        fileName: "bloc-out.gif",
        startLoop: 2,
        endLoop: 4,
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
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;
    p.background(bgColor);
    p.strokeWeight(strokeWeight);

    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor1, endColor1, i / iters);
      p.stroke(c);
      for (let x = -10; x < p.width + 10; x += 10) {
        const theta =
          p.animLoop.theta + (Math.PI * x) / w + (Math.PI * i) / iters;
        p.circle(x, p.height / 2 + (h / 2) * Math.sin(theta), 10);
      }
    }
    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor2, endColor2, i / iters);
      p.stroke(c);
      for (let x = -10; x < p.width + 10; x += 10) {
        const theta =
          Math.PI +
          p.animLoop.theta +
          (Math.PI * x) / w +
          (Math.PI * i) / iters;
        p.circle(x, p.height / 2 + (h / 2) * Math.sin(theta), 10);
      }
    }
  };
};

export default sketch;
