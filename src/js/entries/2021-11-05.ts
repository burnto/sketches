import { MyP5 } from "../types";
import p5 from "p5";
import { hashContains } from "../helpers";

let sketch = (p: MyP5) => {
  const fibSphere = (
    samples: number = 1,
    inverted: boolean = false,
    cycleMod: number = 1
  ) => {
    let points = new Array<p5.Vector>();
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = (1 - (i / (samples - 1)) * 2) * (inverted ? -1 : 1); // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); //  radius at y
      const theta = phi * i; //  golden angle increment
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const v = p.createVector(x, y, z);
      if (i % cycleMod) {
        points.push(v);
      } else {
        points.unshift(v);
      }
    }
    return points;
  };

  p.colorMode(p.HSB, 1, 1, 1, 1);
  const startColor = p.color(1, 0.5, 0.8, 1);
  const endColor = p.color(0, 0.5, 1, 1);
  const duration = 16;
  const numCycles = duration / 2;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(30);
    p.strokeWeight(1);
    p.noFill();
    p.pixelDensity(1);

    let gif;
    if (hashContains("gif")) {
      gif = {
        startLoop: 1,
        // endLoop: 2,
        fileName: "camps",
        options: {
          quality: 5,
        },
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      duration,
      gif,
    });
  };
  p.draw = () => {
    let currentCycle = Math.floor(p.animLoop.progress * numCycles) + 1;

    p.rotateX(-p.animLoop.theta * 2);
    p.rotateY(p.animLoop.theta * 2);
    p.rotateZ(p.animLoop.theta * 2);
    p.background(0);
    const cycle = Math.cos(p.animLoop.theta * numCycles + Math.PI);
    const numCoords = cycle * 100;
    let coords = fibSphere(
      100 + numCoords,
      currentCycle % 2 == 0,
      currentCycle
    );
    p.scale(p.width / 2.5);
    let lastPt: p5.Vector | undefined;
    p.beginShape();
    for (let i = 0; i < coords.length; i++) {
      let newPt = coords[i];
      if (lastPt) {
        const c = p.color(
          0.1 * currentCycle + Math.cos(p.radians(i) + p.animLoop.theta) * 0.1,
          0.5,
          1,
          1
        );
        p.stroke(c);
        if (lastPt) {
          p.curveVertex(newPt.x, newPt.y, newPt.z);
        }
      }
      lastPt = newPt;
    }
    p.endShape();
  };
};

export default sketch;
