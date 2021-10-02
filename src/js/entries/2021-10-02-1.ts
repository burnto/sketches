import p5 from "p5";
import { random, randomChoice, randomInt, shuffleInPlace } from "../helpers";
import { MyP5 } from "../types";

function texture(p: p5): CanvasPattern {
  const size = 100;
  const density = randomInt(100, 1000);
  const trailRange = Math.random() * 6;
  const strokeWeightRange = Math.random();
  const strokeColorRange = randomInt(20, 100);
  const strokeColorBase = randomInt(100, 155);

  let g = p.createGraphics(size, size);
  g.pixelDensity(1.0);

  // TODO - upgrade to noise algo
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      g.set(x, y, randomInt(0, 30));
    }
  }
  g.updatePixels();
  for (let i = 0; i < density; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    // g.set(x, y, g.color(randomInt(180, 200)));

    const trail = p5.Vector.random2D();
    trail.setMag(Math.random() * trailRange);
    trail.add(x, y);
    g.strokeWeight(Math.random() * strokeWeightRange);
    g.stroke(strokeColorBase + Math.floor(Math.random() * strokeColorRange));
    g.line(x, y, trail.x, trail.y);
  }
  let patternCtx = g.drawingContext as CanvasRenderingContext2D;
  return patternCtx.createPattern(g.elt, "repeat")!;
}

enum Orientation {
  Horizontal = 0,
  Vertical = 1,
}

const PALETTES = [
  {
    name: "muds",

    colors: [
      "#582f0e",
      "#7f4f24",
      "#936639",
      "#a68a64",
      "#b6ad90",
      "#c2c5aa",
      "#a4ac86",
      "#656d4a",
      "#414833",
      "#333d29",
    ],
  },

  {
    name: "browns",

    colors: ["#c3a995", "#ab947e", "#6f5e53", "#8a7968", "#593d3b"],
  },

  {
    name: "cafe",
    colors: ["#66101f", "#855a5c", "#8a8e91", "#b8d4e3", "#eeffdb"],
  },
  {
    name: "reds",
    colors: ["#5b2333", "#f7f4f3", "#564d4a", "#f24333", "#ba1b1d"],
  },
];

const palette = randomChoice(PALETTES);
console.info("Palette", palette.name);

const depth = 3;
console.info("Depth", depth);

const range = Math.random() * 0.5;
console.info("Range", range);

const MIN_SUBSEGMENT_LENGTH_COEFF = 0.3;
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

  const render = (p: p5) => {
    p.push();
    p.background(
      p.lerpColor(
        p.color(palette.colors[palette.colors.length - 1]),
        p.color(255),
        0.7
      )
    );
    segment.draw(p, 0, 0, p.width, p.height);
    p.pop();
  };

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
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
