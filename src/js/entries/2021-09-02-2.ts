import { MyP5 } from "../types";

import random from "random";
import Delaunator from "delaunator";

const maxPoints = 420;
const minPoints = 42;
const numPoints = Math.floor(
  random.float() * random.float() * random.float(0, maxPoints - minPoints) +
    minPoints
);
const baseHue = random.float();
const hueRange = random.float(0.1, 0.3);
const baseSaturation = random.float(0.1, 0.5);
const baseBrightness = 0.5;
const shadowThetaOffset = random.float(0, Math.PI * 2);
const shadowDepthOffset = random.float(-0.2, 0.2);
const rotationDuration = random.int(10, 30);
const rotationDirection = random.bool() ? 1 : -1;

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
    const r = maxRadius * Math.pow(random.float(0, 1), 0.4);
    ret[i] = [r * Math.sin(th), r * Math.cos(th)];
  }
  return ret;
}

let sketch = (p: MyP5) => {
  let delaunator: Delaunator<[number, number]>;

  function radius() {
    return p.width / 2 - 20;
  }

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.createDiv("(randomly seeded; refresh to regenerate)");
    p.frameRate(30);
    p.background(10);
    p.colorMode(p.HSB, 1);

    p.fill(baseHue, baseSaturation, baseBrightness);
    let coords = randomPointsRadial(numPoints, radius());
    delaunator = Delaunator.from(coords);

    const gif = {
      startLoop: 1,
      endLoop: 1 + rotationDuration,
      fileName: "arch",
      options: {
        width: 200,
        height: 200,
      },
    };
    p.createLoop({ gif });
  };

  p.draw = () => {
    p.strokeCap(p.SQUARE);
    p.strokeWeight(0.3);
    p.background(0, 0, 0, 1);
    let coords = new Array<[number, number]>();
    for (let i = 0; i < delaunator.coords.length; i += 2) {
      let c: [number, number] = [
        delaunator.coords[i],
        delaunator.coords[i + 1],
      ];
      if (random.int(1, 100) < 10) {
      }
      coords.push(c);
    }
    delaunator = Delaunator.from(coords);

    p.translate(p.width / 2, p.height / 2);
    const th =
      (rotationDirection *
        (p.animLoop.theta + Math.PI * 2 * p.animLoop.elapsedLoops)) /
      rotationDuration;
    p.rotate(th);

    const numTriangles = delaunator.triangles.length / 3;

    for (let i = 0; i < delaunator.triangles.length; i += 3) {
      const [pt1, pt2, pt3] = [
        [
          coords[delaunator.triangles[i]][0],
          coords[delaunator.triangles[i]][1],
        ],
        [
          coords[delaunator.triangles[i + 1]][0],
          coords[delaunator.triangles[i + 1]][1],
        ],

        [
          coords[delaunator.triangles[i + 2]][0],
          coords[delaunator.triangles[i + 2]][1],
        ],
      ];
      const center = [
        (pt1[0] + pt2[0] + pt3[0]) / 3,
        (pt1[1] + pt2[1] + pt3[1]) / 3,
      ];

      const v = p.createVector(center[0], center[1]);
      const heading = v.heading();
      const distance = v.mag() / radius();
      const pts = [pt1, pt2, pt3].flat();
      const hue = (1 + baseHue + hueRange * Math.sin(heading)) % 1;
      const brightness =
        baseBrightness -
        0.5 *
          (shadowDepthOffset +
            Math.sin(shadowThetaOffset + heading + th) * distance);
      p.fill(hue, baseSaturation, brightness);
      p.stroke(hue, baseSaturation, brightness);
      p.triangle(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
    }
  };
};

export default sketch;
