import { MyP5 } from "../types";
import p5, { Vector } from "p5";

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

const mouseDisturbance = true;
const numLines = 40;
const minGravity = 10;
const maxGravity = 100;
const numDisturbances = 40;
const padding = 50;
const frameRate = 30;

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
  constructor(coord: p5.Vector, vector: p5.Vector, readonly radius: number) {
    super(coord, vector);
  }
}

const sketch = (p: MyP5) => {
  let allDisturbances = new Array<Disturbance>();
  let bounds: Rect;
  let pointOffsets: Array<Array<Vector>>;

  p.setup = () => {
    // Basic setup
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.frameRate(frameRate);
    p.noFill();

    // Set up models
    for (let i = 0; i < numDisturbances; i++) {
      let pt = p.createVector(
        Math.random() * p.currentWidth(),
        Math.random() * p.currentWidth()
      );
      let vec = p.createVector(Math.random() - 0.5, Math.random() - 0.5);
      vec.mult(2);
      let radius = p.map(Math.random(), 0, 1, minGravity, maxGravity);
      let d = new Disturbance(pt, vec, radius);
      allDisturbances.push(d);
    }
    bounds = new Rect(0, 0, p.width, p.height);
    pointOffsets = Array(numLines).fill(
      Array(numLines).fill(p.createVector(0, 0))
    );
  };

  function warp(
    x: number,
    y: number,
    disturbances: Array<Disturbance>
  ): p5.Vector {
    const pt: p5.Vector = p.createVector(x, y);
    const warpVector = disturbances.reduce((acc, disturbance) => {
      let distPt = p.createVector(disturbance.coord.x, disturbance.coord.y);
      let delta = p5.Vector.sub(distPt, pt);
      let distance = p5.Vector.mag(delta);
      if (distance < disturbance.radius) {
        const power = Math.abs(distance - disturbance.radius);
        delta.normalize();
        delta.setMag(-1 * Math.pow(power, 1 / 3) * 2);
        // return acc;
        return p5.Vector.add(acc, delta);
      } else {
        return acc;
      }
    }, p.createVector(0, 0));
    return warpVector;
  }

  p.draw = () => {
    bounds = new Rect(
      -maxGravity,
      -maxGravity,
      p.width + maxGravity,
      p.height + maxGravity
    );
    let disturbances = [...allDisturbances];
    if (mouseDisturbance) {
      disturbances.push(
        new Disturbance(
          p.createVector(p.mouseX, p.mouseY),
          p.createVector(),
          p.mouseIsPressed ? 100 : 40
        )
      );
    }

    p.background(40);
    p.stroke(200);
    p.strokeWeight(0.5);

    for (let j = 1; j < numLines - 1; j++) {
      p.beginShape();
      for (let i = 0; i < numLines; i++) {
        const x = p.map(i, 0, numLines - 1, padding, p.width - padding);
        const y = p.map(j, 0, numLines - 1, padding, p.height - padding);
        pointOffsets[i][j] = warp(x, y, disturbances);
        const offset = pointOffsets[i][j];
        p.strokeWeight(0.5);
        p.curveVertex(x + offset.x, y + offset.y);
      }
      p.endShape();
    }

    for (let i = 1; i < numLines - 1; i++) {
      p.beginShape();
      for (let j = 0; j < numLines; j++) {
        const x = p.map(i, 0, numLines - 1, padding, p.width - padding);
        const y = p.map(j, 0, numLines - 1, padding, p.height - padding);
        pointOffsets[i][j] = warp(x, y, disturbances);
        const offset = pointOffsets[i][j];
        p.strokeWeight(0.5);
        p.curveVertex(x + offset.x, y + offset.y);
      }
      p.endShape();
    }

    pointOffsets.forEach((row, i) => {
      row.forEach((pt, j) => {
        const x = ((j + 1) * p.width) / numLines;
        const y = ((i + 1) * p.height) / numLines;
      });
    });

    disturbances.forEach((d) => {
      // p.circle(d.coord.x, d.coord.y, d.radius * 2);
    });
    allDisturbances.forEach((d) => d.tick(bounds));
  };
};

export default sketch;
