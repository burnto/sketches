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
  const duration = 6;
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
    // p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, -1, 500);

  };

  let triSide: number, triHeight: number;

  const tritri = () => {
    for (let i = 0; i < 3; i++) {
      p.push();
      p.rotate(i/3 * 2 * Math.PI);
      p.rotate(p.animLoop.theta + Math.PI/6 * i, [0, 1, 0])
      p.translate(0, triHeight/3);
      p.triangle(-triSide/2, 0, triSide/2, 0, 0, triHeight);
      p.pop();
    }
  }


  p.draw = () => {

    triSide = p.width/20;
    triHeight = triSide * p.sqrt(3)/2;
    const tritriSide = 2 * triSide;
    const dim = 20;
  
    p.background(0);
    p.stroke(255);

    let originX = tritriSide * -((dim-1)/2);
    let originY = triHeight * 2 * -((dim-1)/2);
    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        p.push();
        p.translate(originX + x * tritriSide, 
          originY + y * triHeight * 2);
        tritri();
        p.pop();
      }
    }
    p.push();
    p.rotate(Math.PI);
    p.translate(0,  triHeight/3);
    originX = tritriSide * -((dim-1)/2);
    originY = triHeight * -dim;
    for (let x = 0; x < (dim-1); x++) {
      for (let y = 0; y < dim; y++) {
        p.push();
        p.translate(originX + x * tritriSide, 
          originY + y * triHeight * 2);
        tritri();
        p.pop();
      }
    }
    p.pop();


  };
};

export default sketch;
