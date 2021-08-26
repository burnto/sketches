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
    const pxSize = Math.ceil(p.width / 40);
    const offsetX = p.frameCount / 2;
    const offsetY = p.frameCount / 1.5;
    let dX = p.width / 2 - p.mouseX;
    let dY = p.height / 2 - p.mouseY;

    for (let y = 0; y < p.height; y += pxSize) {
      for (let x = 0; x < p.width; x += pxSize) {
        p.noiseDetail(2, 0.2);
        let noiseValR = p.noise(
          (p.mouseX + x - dX + offsetX) * noiseScale,
          (p.mouseY + y - dY + offsetY) * noiseScale
        );
        let noiseValG = p.noise(
          (p.mouseX + x - dX * 1.2 + offsetX) * noiseScale,
          (p.mouseY + y - dY * 1.2 + offsetY) * noiseScale
        );
        let noiseValB = p.noise(
          (p.mouseX + x - dX * 1.4 + colorDistance + offsetX) * noiseScale,
          (p.mouseY + y - dY * 1.4 + offsetY) * noiseScale
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
