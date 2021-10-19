import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";
import { p5Colors, paletteColors, Palettes } from "../coolers-palettes";

let sketch = (p: MyP5) => {
  const padding = 0;
  const iters = 30;
  const frameRate = 30;
  const strokeWeight = 1.7;

  const palette = Palettes.get("regal")!;
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
  };

  p.draw = () => {
    const w = p.width - padding * 2;
    const h = p.height - padding * 2;
    p.background(bgColor);
    p.strokeWeight(strokeWeight);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(Math.PI / -2);
    p.translate(-p.width / 2, -p.height / 2);

    for (let i = 0; i < iters; i++) {
      let c = p.lerpColor(startColor1, endColor1, i / iters);
      p.stroke(c);
      for (let x = -10; x < p.width + 10; x += 10) {
        const theta =
          Math.PI +
          p.animLoop.theta +
          (Math.PI * x) / w +
          (Math.PI * i) / iters;
        // p.square(x, p.height / 2 + (h / 2) * Math.sin(theta), 5);
        let y = p.height / 2 + (h / 2) * Math.sin(theta);
        let v = p.createVector(20, 0);
        v.rotate(-theta);
        v.add(x, y);
        p.line(x, y, v.x, v.y);
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
          (Math.PI * i * 6) / iters;
        let y = p.height / 2 + (h / 2) * Math.sin(theta);
        let v = p.createVector(3, 0);
        v.rotate(-theta + Math.PI / 2);
        v.add(x, y);
        p.line(x, y, v.x, v.y);
      }
    }
  };
};

export default sketch;
