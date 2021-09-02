import { MyP5 } from "../types";
// import { hashContains } from "../helpers.js";

import random from "random";
import p5 from "p5";
import Delaunator from "delaunator";

const numPoints = random.int(30, 90);

function randomPoints(
  num: number,
  minX: number = 0,
  minY: number = 0,
  maxX: number,
  maxY: number
) {
  let ret = new Array<[number, number]>(num);
  for (let i = 0; i < num; i += 1) {
    ret[i] = [random.int(minX, maxX), random.int(minY, maxY)];
  }
  return ret;
}

function randomPointsRadial(num: number, maxRadius: number) {
  let ret = new Array<[number, number]>(num);
  for (let i = 0; i < num; i += 1) {
    const th = random.float(0, Math.PI * 2);
    const r = random.float(0, maxRadius);
    ret[i] = [r * Math.sin(th), r * Math.cos(th)];
  }
  return ret.flat();
}

let sketch = (p: MyP5) => {
  let delaunator: Delaunator<Float64Array>;
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.frameRate(30);
    p.background(10);
    p.stroke(255, 255, 255, 20);
    p.colorMode(p.HSB, 1);
    const hue = random.float();
    const saturation = random.float();

    p.fill(hue, saturation, 0.5, 0.1);
    let coords = randomPointsRadial(numPoints, p.width / 2 - 10);
    delaunator = new Delaunator(coords);
  };
  p.draw = () => {
    p.background(0);
    let coords = delaunator.coords as Float64Array;
    for (let i = 0; i < coords.length; i++) {
      if (random.int(1, 100) < 10) {
        coords[i] += random.float(0, 2) - 1;
      }
    }

    p.translate(p.width / 2, p.height / 2);
    console.log(coords);
    for (let i = 0; i < delaunator.triangles.length; i += 3) {
      p.triangle(
        coords[delaunator.triangles[i]],
        coords[delaunator.triangles[i] + 1],
        coords[delaunator.triangles[i + 1] + 0],
        coords[delaunator.triangles[i + 1] + 1],
        coords[delaunator.triangles[i + 2] + 0],
        coords[delaunator.triangles[i + 2 + 1]]
      );
    }
  };
};

export default sketch;
