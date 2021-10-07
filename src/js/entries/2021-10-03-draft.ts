import p5 from "p5";
import { random, randomChoice, randomInt, shuffleInPlace } from "../helpers";
import { MyP5 } from "../types";

import { randomPalette } from "../coolers-palettes";

function texture(p: p5): CanvasPattern {
  const size = 200;
  const density = randomInt(100, 1000);
  const trailRange = Math.random() * 20;
  const strokeWeightRange = Math.random();
  const strokeColorRange = randomInt(20, 50);
  const strokeColorBase = randomInt(60, 120);
  const lineLikelihood = Math.random();

  let g = p.createGraphics(size, size);
  g.pixelDensity(1.0);

  // TODO - upgrade to noise algo
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      g.set(x, y, randomInt(0, 40));
    }
  }
  g.updatePixels();
  g.noFill();
  for (let i = 0; i < density; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const trail = p5.Vector.random2D();
    trail.setMag(Math.random() * trailRange);
    trail.add(x, y);
    g.strokeWeight(Math.random() * strokeWeightRange);
    g.stroke(strokeColorBase + Math.floor(Math.random() * strokeColorRange));
    if (Math.random() < lineLikelihood) {
      g.line(x, y, trail.x, trail.y);
    } else {
      let r = Math.random() * trailRange;
      let r2 = Math.random() * trailRange;
      let theta = Math.random() * Math.PI;
      let thetaDelta = Math.random() * Math.PI * 2;

      g.arc(x, y, r, r2, theta, theta + thetaDelta);
    }
  }
  let patternCtx = g.drawingContext as CanvasRenderingContext2D;
  return patternCtx.createPattern(g.elt, "repeat")!;
}

enum Orientation {
  Horizontal = 0,
  Vertical = 1,
}

const palette = randomPalette();

const depth = 3;
console.info("Depth", depth);

const range = Math.random() * 0.2;
console.info("Range", range);

const MIN_SUBSEGMENT_LENGTH_COEFF = 0.4;
const MAX_SUBSEGMENT_LENGTH_COEFF = MIN_SUBSEGMENT_LENGTH_COEFF + range;

class RecursiveSegment {
  private subSegments: RecursiveSegment[] = [];

  private pattern: CanvasPattern;
  private color: p5.Color;
  constructor(
    protected p: p5,
    protected width: number,
    protected length: number,
    protected orientation: Orientation,
    protected depth: number
  ) {
    if (depth > 0) {
      let x = 0;
      while (x < 1) {
        let lengthCoeff = random(
          MIN_SUBSEGMENT_LENGTH_COEFF,
          MAX_SUBSEGMENT_LENGTH_COEFF
        );
        lengthCoeff = Math.min(lengthCoeff, (1 - x) / 1);
        this.subSegments.push(
          new RecursiveSegment(
            p,
            width,
            lengthCoeff,
            orientation ^ 1,
            depth - 1
          )
        );
        x += lengthCoeff;
      }
      shuffleInPlace(this.subSegments);
    }
    this.pattern = texture(p);
    this.color = p.color(100);
  }

  draw(p: p5, x: number, y: number, w: number, h: number) {
    p.fill(255, 255, 255, 255);
    p.rect(x, y, w, h);
    if (this.depth > 0) {
      p.push();
      if (this.orientation === Orientation.Horizontal) {
        this.subSegments.forEach((segment) => {
          segment.draw(p, 0, 0, segment.length * w, h);
          p.translate(segment.length * w, 0);
        });
      } else {
        this.subSegments.forEach((segment) => {
          segment.draw(p, 0, 0, w, segment.length * h);
          p.translate(0, segment.length * h);
        });
      }
      p.pop();
    } else {
      if (this.orientation === Orientation.Horizontal) {
        p.fill(255, 0, 0);
      } else {
        p.fill(255, 0, 255);
      }
      let drawingCtx = this.p.drawingContext as CanvasRenderingContext2D;
      drawingCtx.shadowColor = "#000000cc";
      drawingCtx.shadowBlur = 25; //Math.random();
      p.fill(this.color);
      p.rect(x, y, w, h);
      drawingCtx.save();
      drawingCtx.fillStyle = this.pattern;
      drawingCtx.globalCompositeOperation = "screen";
      this.p.push();
      p.rect(x, y, w, h);
      this.p.pop();
      drawingCtx.restore();
    }
  }
}

const sketch = (p: MyP5) => {
  let numPerSide: number;

  let segment: RecursiveSegment;
  let rotation: number;

  const render = (p: p5) => {
    p.translate(p.width / 2, p.height / 2);
    p.rotate(rotation);
    p.translate(p.width / -2, p.height / -2);
    p.push();
    segment.draw(p, 0, 0, p.width, p.height);
    p.pop();
  };

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.frameRate(30);
    rotation = randomChoice([0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]);

    segment = new RecursiveSegment(p, 30, 200, Orientation.Horizontal, depth);
  };

  p.windowResized = () => {};

  p.draw = () => {
    render(p);
  };
};

export default sketch;
