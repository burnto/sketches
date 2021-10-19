import { MyP5 } from "../types";
import P5 from "p5";
import { initLoop, randomChoice, randomInt, Rect } from "../helpers";
import { randomColor, palettes } from "../palettes";
import { FuncP5 } from "../types";
import func from "p5.js-func";

// @ts-ignore

func(P5);
const p5 = P5 as unknown as FuncP5;

console.log(p5.Ease);

const EASE_OPTIONS = ["exponentialInOut", "circularOut", "linear"];
const FIB = [3, 5, 8, 13, 21, 34];

const palette = randomChoice(palettes);

enum Orientation {
  Horizontal = 1,
  Vertical,
}

class Line {
  readonly orientation: Orientation;
  readonly initialOffset: number;
  public offset: number = 0;
  readonly width: number;
  readonly color: P5.Color;
  readonly ease = new p5.Ease()[randomChoice(EASE_OPTIONS)];

  constructor(p: MyP5) {
    this.orientation = randomChoice([
      Orientation.Horizontal,
      Orientation.Vertical,
    ]);
    this.initialOffset = Math.random();
    this.offset = this.offsetFor(this.initialOffset);
    this.width = randomChoice(FIB);
    this.color = p.color(randomColor(palette));
  }

  offsetFor(t: number) {
    const result = this.ease(t);
    return result;
  }

  tick(p: MyP5) {
    let progress = (this.initialOffset + p.animLoop.progress) % 1;
    let t;
    if (progress < 0.5) {
      t = progress * 2;
    } else {
      t = 1 - (progress - 0.5) * 2;
    }
    this.offset = this.offsetFor(t);
  }
}

class Item {
  lines: Array<Line>;
  rotationOffset = ((randomInt(0, 24) * 15) / 180) * Math.PI;

  constructor(p: MyP5, readonly size: number) {
    this.lines = [];

    const numParts = randomChoice(FIB);
    for (let i = 0; i < numParts; i++) {
      this.lines.push(new Line(p));
    }
  }

  public draw(p: MyP5) {
    p.colorMode(p.HSL);
    p.rotate(this.rotationOffset);
    this.lines.forEach((line, i) => {
      p.push();
      if (line.orientation === Orientation.Vertical) {
        p.rotate(Math.PI / 2);
      }
      p.translate(
        -this.size / 2,
        -this.size / 2 + line.offset * (this.size - FIB.slice(-1)[0]),
        0
      );
      const lightness = p.lightness(line.color);
      const saturation = p.saturation(line.color);
      const hue = p.hue(line.color);

      const darkerLightness = lightness; // * (0.8 + (0.3 * i) / this.lines.length);

      p.fill(hue, saturation, darkerLightness);
      if (line.color.toString() === p.color(palette.bg).toString()) {
        p.scale(1.2);
      }
      p.rect(0, -line.width / 2, this.size, line.width);
      p.pop();
    });
  }

  public tick(p: MyP5) {
    this.lines.forEach((line, i) => line.tick(p));
  }
}

const sketch = (p: MyP5) => {
  const items = new Array<Item>();

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.createDiv("(randomly seeded; refresh to regenerate)");
    p.frameRate(30);
    p.noStroke();
    initLoop(p, { duration: 4 });
    items.push(new Item(p, p.width * 0.6));
  };

  p.draw = () => {
    p.background(palette.bg);
    items.forEach((item, i) => {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      item.draw(p);
      p.pop();
      item.tick(p);
    });
  };
};

export default sketch;
