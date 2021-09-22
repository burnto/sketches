import { MyP5 } from "../types";
import p5 from "p5";

const duration = 5;
const fps = 30;

let params = Object.assign(
  {},
  {
    numRays: 6,
    numDisturbances: 6,
    color: "#669999",
    strokeWeight: 1.0,
    fillOpacity: 10,
    gif: false,
    open: true,
    startLoop: 1,
    endLoop: 2,
    quality: 5,
    workers: 20,
  }
);
const numLines = 100;
const minGravity = 20;
const maxGravity = 200;
const numDisturbances = 20;
const yInc = 10;

class Rect {
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

class Mover {
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

class Disturbance extends Mover {
  constructor(coord: p5.Vector, vector: p5.Vector, readonly force: number) {
    super(coord, vector);
  }
}

const sketch = (p: MyP5) => {
  let allDisturbances = new Array<Disturbance>();
  let bounds: Rect;

  p.setup = () => {
    // Basic setup
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.frameRate(30);
    p.noFill();
    p.createDiv("(randomly seeded; refresh to regenerate)");

    // Set up models
    for (let i = 0; i < numDisturbances; i++) {
      let pt = p.createVector(
        Math.random() * p.currentWidth(),
        Math.random() * p.currentWidth()
      );
      let vec = p.createVector(Math.random() - 0.5, Math.random() - 0.5);
      vec.mult(4);
      let force = p.map(Math.random(), 0, 1, minGravity, maxGravity);
      let d = new Disturbance(pt, vec, force);
      allDisturbances.push(d);
    }
    bounds = new Rect(0, 0, p.width, p.height);
  };

  function warp(x: number, y: number): p5.Vector {
    const pt: p5.Vector = p.createVector(x, y);
    const warpVector = allDisturbances.reduce((acc, disturbance, i) => {
      let distPt = p.createVector(disturbance.coord.x, disturbance.coord.y);
      let delta = p5.Vector.sub(pt, distPt);
      let distance = p5.Vector.mag(delta);
      if (distance < disturbance.force) {
        delta.normalize();
        delta.mult(Math.sqrt(disturbance.force));
        return p5.Vector.add(acc, delta);
      } else {
        return acc;
      }
    }, p.createVector(0, 0));
    pt.add(warpVector);
    return pt;
  }

  p.draw = () => {
    bounds = new Rect(
      -maxGravity,
      -maxGravity,
      p.width + maxGravity,
      p.height + maxGravity
    );
    p.background(255);
    p.stroke(0);
    p.strokeWeight(0.5);
    for (let i = 0; i < numLines; i++) {
      let x = ((i + 1) * p.width) / numLines;
      p.beginShape();
      for (let y = -40; y < p.height + 40; y += yInc) {
        const w = warp(x, y);
        p.curveVertex(w.x, w.y);
      }
      p.endShape();
    }
    allDisturbances.forEach((d) => d.tick(bounds));
  };
};

export default sketch;
