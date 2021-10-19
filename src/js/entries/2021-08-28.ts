import { MyP5 } from "../types";

export default (p: MyP5) => {
  let skyPicker: any;
  let waterPicker1: any;
  let waterPicker2: any;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noiseSeed(1);
    p.noStroke();
    p.fill(0);
    p.frameRate(30);
    skyPicker = p.createColorPicker("#F037A5");
    waterPicker1 = p.createColorPicker("#1E3163");
    waterPicker2 = p.createColorPicker("#2D46B9");
  };
  let noiseScale = 0.01;

  p.draw = () => {
    p.background(skyPicker.color());
    for (var i = 0; i < 7; i++) {
      let c = p.lerpColor(waterPicker1.color(), waterPicker2.color(), i / 6);
      p.fill(c);
      p.beginShape();
      for (let x = 0; x <= p.width + 100; x += 30) {
        const noiseVal = p.noise(x * noiseScale, i + 1);
        const sinVal = Math.sin(p.radians(p.frameCount * (i + 1) + x));
        let y =
          p.width / 10 +
          (i * p.height - 200) / 10 +
          p.height * 0.09 * sinVal +
          (noiseVal * p.height) / 5;
        p.curveVertex(x - 50, y);
      }
      p.curveVertex(p.width + 100, p.height + 100);
      p.curveVertex(-50, p.height + 100);
      p.curveVertex(-50, 0);
      p.endShape();
    }
  };
};
