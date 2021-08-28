import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noStroke();
    p.noiseSeed(1);
    p.noStroke();
    p.fill(255, 255, 255, 50);
    // p.stroke(255, 255, 255, 80);
    p.frameRate(30);
    // p.noiseDetail(2, 0.1);
  };
  let noiseScale = 0.01;

  p.draw = () => {
    p.background(40, 40, 40);
    for (var i = 0; i < 6; i++) {
      p.beginShape();
      for (let x = 0; x <= p.width + 100; x += 20) {
        const noiseVal = p.noise(p.frameCount / 200 + x * noiseScale, i + 100);
        const sinVal = Math.sin(p.radians(p.frameCount + x));
        let y =
          100 +
          (i * p.height - 200) / 10 +
          p.height * 0.1 * sinVal +
          (noiseVal * p.height) / 5;
        p.curveVertex(x - 50, y);
        // p.stroke(255);
        // p.strokeWeight(5);
        // p.point(x - 50, y);
      }
      p.curveVertex(p.width + 100, p.height + 100);
      p.curveVertex(-50, p.height + 100);
      p.curveVertex(-50, 0);
      p.endShape();
    }
  };
};
