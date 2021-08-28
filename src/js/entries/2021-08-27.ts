import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.noiseSeed(1);
    p.stroke(255);
    p.noFill();
    p.frameRate(30);
    p.strokeWeight(1);
    p.noiseDetail(2, 0.2);
  };
  let noiseScale = 0.2;

  p.draw = () => {
    p.background(40, 40, 40, 30);
    p.beginShape();
    for (let x = -50; x < p.width + 100; x += 50) {
      const noiseVal = p.noise(p.frameCount * noiseScale + x, 0);
      let y = p.height / 2 - 50 + 200 * noiseVal;
      p.curveVertex(x, y);
    }
    p.endShape();
  };
};
