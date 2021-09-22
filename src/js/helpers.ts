import { MyP5 } from "./types";
import p5 from "p5";

export function hashContains(s: string): boolean {
  return !!window?.location?.hash?.match(s);
}

// Random integer between min and max, inclusive
export function randomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (1 + max - min));
}

export function randomChoice<T>(a: Array<T>) {
  const index = Math.floor(Math.random() * a.length);
  return a[index];
}

interface CreateLoopGifOpts {
  render?: boolean;
  options?: { quality: number };
  fileName?: string;
  startLoop?: number;
  endLoop?: number;
  download?: boolean;
  open?: boolean;
}

export function initLoop(
  p: MyP5,
  opts: any = {},
  gifOpts: CreateLoopGifOpts = {}
) {
  let gif: CreateLoopGifOpts = {
    render: hashContains("render"),
    options: { quality: 5 },
    fileName: "bloc-out.gif",
    startLoop: 1,
    endLoop: 2,
    download: hashContains("download"),
    open: hashContains("open"),
  };
  Object.assign(gif, gifOpts);

  const loopOpts = Object.assign({}, { gif, duration: 20 });
  p.createLoop(loopOpts);
  p.animLoop.noiseFrequency(0.1);
}

export class Rect {
  constructor(
    public minX: number,
    public minY: number,
    public maxX: number,
    public maxY: number
  ) {
    if (minX > maxX || minY > maxY) {
      throw "positive rects only";
    }
  }

  get width() {
    return this.maxX - this.minX;
  }

  get height() {
    return this.maxY - this.minY;
  }

  inBounds(x: number, y: number): boolean {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}

export class Mover {
  private _coord: p5.Vector;
  private _vector: p5.Vector;
  constructor(coord: p5.Vector, vector: p5.Vector) {
    this._coord = coord;
    this._vector = vector;
  }

  public get coord() {
    return this._coord;
  }

  public get vector() {
    return this._vector;
  }

  // todo - use delta time elapsed instead of frame ticks
  tick(bounds: Rect) {
    this._coord.add(this._vector);

    if (this._coord.x < bounds.minX) {
      this._coord.x += bounds.width;
    } else if (this._coord.x > bounds.maxX) {
      this._coord.x -= bounds.width;
    }

    if (this._coord.y < bounds.minY) {
      this._coord.y += bounds.height;
    } else if (this._coord.y > bounds.maxY) {
      this._coord.y -= bounds.height;
    }
  }
}