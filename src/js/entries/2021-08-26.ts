import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.frameRate(60);
    p.noiseSeed(1);
  };

  let r = 0;
  let noiseScale = 0.03;
  let colorDistance = 10;
  p.draw = () => {
    r += 1;
    p.noStroke();
    p.background(238);
    p.noiseDetail(2, 0.2);
    const pxSize = p.width / 30;
    const offsetX = p.frameCount / 4;
    const offsetY = p.frameCount / 5;
    colorDistance = p.dist(p.width / 2, p.height / 2, p.mouseX, p.mouseY) / 10;
    for (let y = 0; y < p.height; y += pxSize) {
      for (let x = 0; x < p.width; x += pxSize) {
        p.noiseDetail(2, 0.2);
        let noiseValR = p.noise(
          (p.mouseX + x - colorDistance + offsetX) * noiseScale,
          (p.mouseY + y + offsetY) * noiseScale
        );
        let noiseValG = p.noise(
          (p.mouseX + x + offsetX) * noiseScale,
          (p.mouseY + y + offsetY) * noiseScale
        );
        let noiseValB = p.noise(
          (p.mouseX + x + colorDistance + offsetX) * noiseScale,
          (p.mouseY + y + offsetY) * noiseScale
        );

        const r = noiseValR * 255;
        const g = noiseValG * 255;
        const b = noiseValB * 255;

        p.fill(r, g, b);
        p.rect(x, y, pxSize, pxSize);
      }
    }
  };
};
