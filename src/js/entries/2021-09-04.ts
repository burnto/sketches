import { MyP5 } from "../types";
import p5 from "p5";
import { hashContains } from "../helpers";

let sketch = (p: MyP5) => {
  const fibSphere = (samples: number = 1) => {
    let points = new Array<p5.Vector>();
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); //  # radius at y
      const theta = phi * i; //  # golden angle increment
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const v = p.createVector(x, y, z);
      points.push(v);
    }
    return points;
  };

  p.colorMode(p.HSB, 1, 1, 1, 1);
  const startColor = p.color(1, 0.5, 0.8, 1);
  const endColor = p.color(0, 0.5, 1, 1);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(30);
    p.strokeWeight(0.5);
    p.noFill();

    let gif;
    if (hashContains("gif")) {
      console.log("gif enabled");
      gif = {
        startLoop: 1,
        endLoop: 2,
        fileName: "camps",
        options: {
          quality: 5,
        },
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      duration: 6,
      gif,
    });
  };
  p.draw = () => {
    p.rotateY(p.animLoop.theta);
    p.rotateZ(p.animLoop.theta);
    p.background(0);
    const numCoords = Math.sin(p.animLoop.theta) * 100;
    let coords = fibSphere(120 + numCoords);
    p.scale(120);
    let lastPt: p5.Vector | undefined;
    for (let i = 0; i < coords.length; i++) {
      let newPt = coords[i];

      if (lastPt) {
        // const c = p.lerpColor(
        //   startColor,
        //   endColor,
        //   0.5 + Math.cos(p.radians(i * 2) + p.animLoop.theta) / 4
        // );
        const c = p.color(
          0.5 + Math.sin(p.radians(i) + p.animLoop.theta) / 4,
          0.5,
          1,
          1
        );
        p.stroke(c);
        if (lastPt) {
          p.line(lastPt.x, lastPt.y, lastPt.z, newPt.x, newPt.y, newPt.z);
        }
      }
      lastPt = newPt;
    }
  };
};

export default sketch;
