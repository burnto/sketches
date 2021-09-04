import { MyP5 } from "../types";

import random from "random";
import Delaunator from "delaunator";
import { Vector } from "p5";
import { rootCertificates } from "tls";

const rotationDuration = 5;
const numPoints = 120;
const stemAngle = 0.03 * Math.PI;

let sketch = (p: MyP5) => {
  const randomThetas = (num: number) => {
    let ret = new Array<number[]>();
    for (let i = 0; i < num; i += 1) {
      const th1 = Math.random() * 2 * Math.PI;
      const th2 = Math.random() * 2 * Math.PI;
      const th3 = Math.random() * 2 * Math.PI;
      ret.push([th1, th2, th3]);
    }
    return ret;
  };

  const r = (n: number) => {
    return n * p.width;
  };

  let coords: Array<number[]>;

  p.setup = () => {
    p.createCanvas(300, 300, p.WEBGL);
    p.createDiv("(randomly seeded; refresh to regenerate)");
    p.frameRate(1);
    p.background(10);
    coords = randomThetas(numPoints);

    const gif = {
      startLoop: 1,
      endLoop: rotationDuration,
      fileName: "arch",
      options: {
        width: 100,
        height: 100,
      },
    };
    p.createLoop({ gif });
    // console.log(p.animLoop);
  };

  p.draw = () => {
    // const r = p.animLoop.theta;
    // (p.animLoop.elapsedLoops / rotationDuration) * 2 * Math.PI;
    p.orbitControl();
    p.lights();
    const r =
      (p.animLoop.theta + Math.PI * 2 * p.animLoop.elapsedLoops) /
      rotationDuration;
    // p.rotateY(r);
    p.background(10);
    p.strokeWeight(0.5);
    p.noStroke();

    drawDandy();
  };

  const drawDandy = () => {
    p.push();

    p.fill(255, 200, 0, 200);
    p.sphere(8);
    p.fill(20, 190, 30, 255);
    p.rotateZ(stemAngle);
    p.translate(0, 100, 0);
    p.cylinder(3, 200);
    p.pop();

    p.fill(255, 255, 255, 200);

    for (let i = 0; i < numPoints; i += 1) {
      p.push();
      p.rotateX(coords[i][0]);
      p.rotateY(coords[i][1]);
      p.rotateZ(coords[i][2]);

      p.beginShape();
      p.curveVertex(-20, 0);
      p.curveVertex(0, 0);
      p.curveVertex(80, 10);
      p.curveVertex(120, 0);
      p.curveVertex(120, 10);
      p.endShape();

      p.beginShape();
      p.curveVertex(-20, 0);
      p.curveVertex(0, 0);
      p.curveVertex(80, -10);
      p.curveVertex(120, 0);
      p.curveVertex(120, -10);
      p.endShape();

      p.pop();
    }
  };
};

export default sketch;
