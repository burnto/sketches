import p5, { Color, Graphics } from "p5";
import { random, randomChoice, randomInt, shuffleInPlace } from "../helpers";
import { MyP5 } from "../types";

class PatternMaker {
  private data: boolean[];
  private g: p5.Graphics;

  constructor(p: p5, private size: number) {
    this.data = new Array(size * size)
      .fill(false)
      .map(() => Math.random() > 0.1);

    this.g = p.createGraphics(this.size, this.size);
    this.g.pixelDensity(1.0);
  }

  tick(progress: number) {}

  canvasPattern(progress: number): CanvasPattern {
    this.tick(progress);
    this.g.background(0);
    this.data.forEach((v, i) => {
      let x = i % this.size;
      let y = Math.floor(i / this.size);
      this.g.set(x, y, this.g.color(randomInt(230, 255)));
    });

    this.g.updatePixels();
    let patternCtx = this.g.drawingContext as CanvasRenderingContext2D;
    return patternCtx.createPattern(this.g.elt, "repeat")!;
  }
}

enum Orientation {
  Horizontal = 0,
  Vertical = 1,
}

const PALETTES = [
  {
    name: "coldgray",
    colors: ["#000000", "#2f4550", "#586f7c", "#b8dbd9", "#f4f4f9"],
  },
  {
    name: "blues",
    colors: [
      "#012a4a",
      "#013a63",
      "#01497c",
      "#014f86",
      "#2a6f97",
      "#2c7da0",
      "#468faf",
      "#61a5c2",
      "#89c2d9",
      "#a9d6e5",
    ],
  },

  {
    name: "subdued",
    colors: ["#033f63", "#28666e", "#7c9885", "#b5b682", "#fedc97"],
  },
];

const palette = randomChoice(PALETTES);
console.info("Palette", palette.name);

const depth = 3;
console.info("Depth", depth);

const range = Math.random() * 0.25;
console.info("Range", range);

const MIN_SUBSEGMENT_LENGTH_COEFF = 0.15;
const MAX_SUBSEGMENT_LENGTH_COEFF = MIN_SUBSEGMENT_LENGTH_COEFF + range;

class RecursiveSegment {
  private subSegments: RecursiveSegment[] = [];

  private patternMaker: PatternMaker;
  private pattern: CanvasPattern;
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
    this.patternMaker = new PatternMaker(p, randomInt(2, 10));
    this.pattern = this.patternMaker.canvasPattern(1);
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
      drawingCtx.save();
      drawingCtx.fillStyle = this.pattern;
      drawingCtx.globalCompositeOperation = "multiply";
      this.p.push();
      p.rect(x, y, w, h);
      p.fill(randomChoice(palette.colors));
      p.rect(x, y, w, h);
      this.p.pop();
      drawingCtx.restore();

      // this.patternMaker.canvasPattern
      // this.patternedShape.withPattern(1, () => {
      //   p.rect(x, y, w, h);
      // });
    }
  }
}

const sketch = (p: MyP5) => {
  let shapes: PatternedShape[] = [];
  let numPerSide: number;

  let segments: RecursiveSegment[] = [];
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.frameRate(30);

    let segment = new RecursiveSegment(
      p,
      30,
      200,
      Orientation.Horizontal,
      depth
    );

    p.background(0);
    p.push();
    p.translate(0, 0);
    segment.draw(p, 0, 0, p.width, p.height);
    p.pop();
  };

  p.draw = () => {};
};

export default sketch;
