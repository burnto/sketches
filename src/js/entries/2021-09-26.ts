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

class PatternedShape {
  private patternMaker: PatternMaker;

  constructor(private p: p5) {
    this.patternMaker = new PatternMaker(p, Math.floor(p.random(5, 25)));
  }

  withPattern(progress: number, drawFunc: () => void) {
    let drawingCtx = this.p.drawingContext as CanvasRenderingContext2D;
    drawingCtx.save();
    drawingCtx.fillStyle = this.patternMaker.canvasPattern(progress);
    this.p.push();
    drawFunc();
    this.p.pop();
    drawingCtx.restore();
  }
}

class PatternMaker {
  private data: boolean[];
  private mask: boolean[];
  private g: p5.Graphics;
  constructor(p: p5, private size: number) {
    this.data = new Array(size * size)
      .fill(false)
      .map(() => Math.random() > 0.5);

    this.mask = new Array(size * size).fill(false);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < Math.ceil(size / 2); x++) {
        let v = Math.random() > 0.8;
        this.mask[y * size + x] = v;
        this.mask[(y + 1) * size - x] = v;
      }
    }

    this.g = p.createGraphics(this.size, this.size);
  }

  tick(progress: number) {
    let numPix = this.size * this.size;

    if (progress < 0.5) {
      let i = Math.floor((numPix * progress) / 0.5);
      this.data[i] = this.mask[i];
    } else {
      let i = Math.floor((numPix * progress) / 0.5);
      this.data[i] = !this.mask[i];
    }
  }

  canvasPattern(progress: number): CanvasPattern {
    this.tick(progress);
    this.g.background(30);
    this.g.stroke(220);
    this.data.forEach((v, i) => {
      let x = i % this.size;
      let y = i / this.size;
      if (v) {
        this.g.point(x, y);
      }
    });
    let patternCtx = this.g.drawingContext as CanvasRenderingContext2D;
    return patternCtx.createPattern(this.g.elt, "repeat")!;
  }
}

const sketch = (p: MyP5) => {
  let shapes: PatternedShape[] = [];
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.frameRate(30);

    for (let i = 0; i < 25; i++) {
      shapes.push(new PatternedShape(p));
    }
  };

  p.draw = () => {
    p.background(0);
    let progress = (p.frameCount / 1000) % 1;
    let sqWidth = p.width / 5;
    shapes.forEach((s, i) => {
      p.push();
      p.translate(sqWidth * (i % 5), sqWidth * Math.floor(i / 5));
      s.withPattern(progress, () => {
        p.rect(0, 0, sqWidth, sqWidth);
        p.pop();
      });
    });
  };
};

export default sketch;
