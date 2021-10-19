import { MyP5 } from "../types";
// import { hashContains } from "../helpers.js";

import random from "random";
import p5 from "p5";
import Delaunator from "delaunator";

const numPoints = 30;

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
  return ret;
}

let sketch = (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(3);
    p.fill(255, 255, 255, 200);
  };
  p.draw = () => {
    let coords = randomPointsRadial(numPoints, p.width / 2 - 10);
    p.translate(p.width / 2, p.height / 2);
    console.log(coords);
    const d = Delaunator.from(coords);
    const triangleCoords = new Array();
    for (let i = 0; i < d.triangles.length; i += 3) {
      p.triangle(
        coords[d.triangles[i]][0],
        coords[d.triangles[i]][1],
        coords[d.triangles[i + 1]][0],
        coords[d.triangles[i + 1]][1],
        coords[d.triangles[i + 2]][0],
        coords[d.triangles[i + 2]][1]
      );
    }
  };
};

export default sketch;
