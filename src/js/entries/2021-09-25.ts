import p5, { Graphics } from "p5";
import { MyP5 } from "../types";

interface Circle {
  x: number;
  y: number;
  d: number;
  progressOffset: number;
  patternSize: number;
  rotation: number;
}

const sketch = (p: MyP5) => {
  let g: Graphics;
  let circles: Circle[] = [];
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.frameRate(30);

    for (let i = 0; i < 40; i++) {
      circles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        d: p.random(p.height / 3, p.height * 2),
        progressOffset: p.random(),
        patternSize: Math.floor(p.random(30) + 1),
        rotation: p.random() * Math.PI,
      });
    }
  };

  const randomPattern = (p: p5, size: number, progress: number) => {
    g = p.createGraphics(size, size);
    g.background(0);
    g.stroke(0);
    g.colorMode(g.HSB);
    for (let x = 0; x < size; x++) {
      let y =
        g.height / 2 +
        (g.height / 2) *
          Math.sin(progress * 2 * Math.PI + (Math.PI * 2 * x) / size);
      g.stroke(progress * 255, 255, 255);
      g.point(x, y);
    }

    let patternCtx = p.drawingContext as CanvasRenderingContext2D;
    return patternCtx.createPattern(g.elt, "repeat")!;
  };

  p.draw = () => {
    p.background(0);
    circles.forEach((c, i) => {
      let pattern = randomPattern(
        p,
        c.patternSize,
        (c.progressOffset + (p.frameCount % 100) / 100) % 1
      );

      let drawingCtx = p.drawingContext as CanvasRenderingContext2D;
      drawingCtx.save();
      drawingCtx.fillStyle = pattern;

      p.push();
      p.rotate(c.rotation);
      p.translate(c.x, c.y);
      p.ellipse(0, 0, c.d, c.d);
      p.pop();
      drawingCtx.restore();
    });
  };
};

export default sketch;
