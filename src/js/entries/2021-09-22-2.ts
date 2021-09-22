import { MyP5 } from "../types";
import p5 from "p5";
import { initLoop, randomChoice, randomInt, Rect } from "../helpers";
import { randomColor, palettes } from "../palettes";

const FIB = [3, 5, 8, 13, 21, 34, 55];
const MAX_LINES = 21;
const MIN_LINES = 3;

const palette = randomChoice(palettes);

enum Orientation {
  Horizontal = 1,
  Vertical,
}

class Line {
  readonly orientation: Orientation;
  readonly offset: number;
  readonly width: number;
  readonly color: p5.Color;

  constructor(p: MyP5) {
    this.orientation = randomChoice([
      Orientation.Horizontal,
      Orientation.Vertical,
    ]);
    this.offset = randomChoice(FIB) / FIB.slice(-1)[0];
    this.width = randomChoice(FIB);
    this.color = p.color(randomColor(palette));
  }
}

class Item {
  lines: Array<Line>;
  rotationOffset = Math.PI * 2 * Math.random();

  constructor(p: MyP5, readonly size: number) {
    this.lines = [];

    const numParts = randomChoice(FIB);
    for (let i = 0; i < numParts; i++) {
      this.lines.push(new Line(p));
    }
  }

  public draw(p: MyP5) {
    // p.circle(0, 0, 5);
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

      const darkerLightness = lightness * (0.9 + (0.1 * i) / this.lines.length);

      p.fill(hue, saturation, darkerLightness);
      p.rect(0, -line.width / 2, this.size, line.width);
      p.pop();
    });
  }

  public tick(p: MyP5) {}
}

const sketch = (p: MyP5) => {
  const items = new Array<Item>();

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.frameRate(30);
    p.noStroke();
    initLoop(p);
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
