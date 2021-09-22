import { MyP5 } from "../types";
import p5 from "p5";
import { initLoop, randomChoice, randomInt, Rect } from "../helpers";
import { randomColor, palettes } from "../palettes";


const FIB = [3, 5, 8, 13, 21, 34];

const palette = randomChoice(palettes);

enum Orientation {
  Horizontal = 1,
  Vertical,
}

class Line {
  readonly orientation: Orientation;
  readonly initialTheta: number;
  public offset: number;
  readonly width: number;
  readonly color: p5.Color;

  constructor(p: MyP5) {
    this.orientation = randomChoice([
      Orientation.Horizontal,
      Orientation.Vertical,
    ]);
    this.initialTheta = Math.random() * Math.PI * 2;
    this.offset = Math.sin(this.initialTheta + p.animLoop.theta);
    this.width = randomChoice(FIB);
    this.color = p.color(randomColor(palette));
  }
  tick(p: MyP5) {
    this.offset = Math.sin(this.initialTheta + p.animLoop.theta) / 2 + 0.5;
  }
}

class Item {
  lines: Array<Line>;
  rotationOffset = ((randomInt(0, 24) * 15) / 180) * Math.PI;

  constructor(p: MyP5, readonly size: number) {
    this.lines = [];

    const numParts = randomChoice(FIB) * 30;
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
    p.createCanvas(p.currentWidth(), p.currentWidth());
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
