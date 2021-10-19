import p5 from "p5";
import { random, randomChoice, randomInt, shuffleInPlace } from "../helpers";
import { MyP5 } from "../types";

function texture(p: p5): CanvasPattern {
  const size = 100;

  let g = p.createGraphics(size, size);
  g.pixelDensity(1.0);
  g.background(randomInt(0, 10));

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    g.set(x, y, g.color(randomInt(180, 255)));
  }
  g.updatePixels();
  let patternCtx = g.drawingContext as CanvasRenderingContext2D;
  return patternCtx.createPattern(g.elt, "repeat")!;
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

const depth = 2;
console.info("Depth", depth);

const range = Math.random() * 0.45;
console.info("Range", range);

const MIN_SUBSEGMENT_LENGTH_COEFF = 0.15;
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
    this.color = p.color(randomChoice(palette.colors));
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
      p.fill(this.color);
      p.rect(x, y, w, h);
      this.p.pop();
      drawingCtx.restore();
    }
  }
}

const sketch = (p: MyP5) => {
  let numPerSide: number;

  let segment: RecursiveSegment;

  const render = (p: p5) => {
    p.push();
    p.background(
      p.lerpColor(
        p.color(palette.colors[palette.colors.length - 1]),
        p.color(255),
        0.7
      )
    );
    const padding = p.width / 10;
    p.translate(padding, padding);
    segment.draw(p, 0, 0, p.width - padding * 2, p.height - padding * 2);
    p.pop();
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.frameRate(30);

    segment = new RecursiveSegment(p, 30, 200, Orientation.Horizontal, depth);
  };

  p.windowResized = () => {};

  p.draw = () => {
    render(p);
  };
};

export default sketch;
