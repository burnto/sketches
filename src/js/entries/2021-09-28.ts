import p5, { Color, Graphics } from "p5";
import { randomInt } from "../helpers";
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
    this.patternMaker = new PatternMaker(p, 300);
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
  // private mask: boolean[];
  private g: p5.Graphics;

  constructor(p: p5, private size: number) {
    this.data = new Array(size * size)
      .fill(false)
      .map(() => Math.random() > 0.5);

    // this.mask = new Array(size * size).fill(false);
    // for (let y = 0; y < size; y++) {
    //   for (let x = 0; x < Math.ceil(size / 2); x++) {
    //     let v = Math.random() > 0.8;
    //     this.mask[y * size + x] = v;
    //     this.mask[(y + 1) * size - x] = v;
    //   }
    // }

    this.g = p.createGraphics(this.size, this.size);
  }

  tick(progress: number) {
    let v = this.data.shift() || false;
    console.log(v);
    this.data.push(v);
    this.data = this.data.map((p) => (Math.random() > 0.9 ? !p : p));
    this.data.forEach((d, i) => {
      if (d && Math.random() > 0.9) {
        this.data[i + this.size] = d;
      }
    });
  }

  canvasPattern(progress: number): CanvasPattern {
    this.tick(progress);
    this.g.colorMode(this.g.HSB, 1);
    this.g.background(0);
    let colors = [
      this.g.color(1, 1, 0.8),
      this.g.color(0.8, 1, 1),
      this.g.color(0.8, 0.6, 0),
      this.g.color(0.6, 1, 0.2),
      this.g.color(0.6, 0.7, 1.0),
      this.g.color(0.2, 1, 0.8),
    ];
    this.data.forEach((v, i) => {
      let x = i % this.size;
      let y = Math.floor(i / this.size);
      if (v) {
        if (Math.random() > 0.99) {
          this.g.set(x, y, colors[4]);
        } else {
          this.g.set(x, y, colors[3]);
        }
      } else {
        if (Math.random() > 0.99) {
          this.g.set(x, y, colors[2]);
        } else {
          this.g.set(x, y, colors[1]);
        }
      }
    });
    this.g.updatePixels();
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

    for (let i = 0; i < 1; i++) {
      shapes.push(new PatternedShape(p));
    }
  };

  p.draw = () => {
    p.background(0);
    let progress = (p.frameCount / 1000) % 1;
    let sqWidth = p.width / Math.sqrt(shapes.length);
    p.translate(-100, -100 * progress, 0);
    shapes.slice(0, 1).forEach((s, i) => {
      p.translate(sqWidth * (i % 5), sqWidth * Math.floor(i / 5));
      s.withPattern(progress, () => {
        p.push();
        p.translate(100, 100 * progress, 0);
        p.rect(0, 0, sqWidth, sqWidth);
        p.pop();
      });
    });
  };
};

export default sketch;
