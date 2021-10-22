import { MyP5 } from "../types";

import random from "random";
import Delaunator from "delaunator";
import { hashContains } from "../helpers";
import { randomInt } from "../helpers";

const maxPoints = 420;
const minPoints = 42;
const numPoints = Math.floor(
  random.float() * random.float() * random.float(0, maxPoints - minPoints) +
    minPoints
);
const baseHue = random.float();
const hueRange = random.float(0.1, 0.2);
const baseSaturation = 1; //random.float(0.1, 0.5);
const baseBrightness = 0.3;
const shadowThetaOffset = random.float(0, Math.PI * 2);
const shadowDepthOffset = random.float(-0.2, 0.2);
const rotationDuration = random.int(10, 30);
const rotationDirection = random.bool() ? 1 : -1;
const radiusScale = random.float(0.45, 0.1);
const numStars = randomInt(200, 1000);
const starMinSize = 1;
const starMaxSize = 2.5;
const starMinBrightness = 0.1;
const starMaxBrightness = 0.7;

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

function randomStar() {
  return {
    x: Math.random(),
    y: Math.random(),
    size: starMinSize + Math.random() * (starMaxSize - starMinSize),
    brightness:
      starMinBrightness +
      Math.random() * (starMaxBrightness - starMinBrightness),
  };
}

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
  let stars: Star[];
  function radius() {
    return Math.min(p.width, p.height) * radiusScale;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.createDiv("(randomly seeded; refresh to regenerate)");
    p.frameRate(30);
    p.pixelDensity(1);
    p.background(10);
    p.colorMode(p.HSB, 1);

    p.fill(baseHue, baseSaturation, baseBrightness);
    let coords = randomPointsRadial(numPoints, radius());
    delaunator = Delaunator.from(coords);

    let gif;
    if (hashContains("gif")) {
      gif = {
        startLoop: 1,
        endLoop: 1 + rotationDuration,
        fileName: "bloc-out.gif",
        options: {
          width: p.windowWidth,
          height: p.windowHeight,
          quality: 5,
        },
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    stars = Array.from({ length: numStars }, () => randomStar());
    p.createLoop({ gif });
  };

  p.draw = () => {
    p.strokeCap(p.SQUARE);
    p.noStroke();
    p.background(0, 0, 0, 1);
    stars.forEach((s) => {
      p.fill(1, 0, 1, s.brightness);
      p.circle(
        s.x * (p.width + starMaxSize * 2) - starMaxSize,
        s.y * (p.height + starMaxSize * 2) - starMaxSize,
        s.size
      );
    });

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
