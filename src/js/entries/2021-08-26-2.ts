import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth(), p.WEBGL);
    p.noStroke();
    p.noiseSeed(1);
    p.noiseDetail(2, 0.2);
  };

  const noiseScale = 0.1;

  const wallSize = (numUnits: number, unitSize: number, spacing: number) => {
    return numUnits * unitSize + (numUnits - 1) * spacing;
  };

  const drawWall = (numUnits: number, unitSize: number, spacing: number) => {
    const offsetX = p.frameCount / 10;
    const offsetY = p.frameCount / 10;
    let colorDistance =
      p.dist(p.width / 2, p.height / 2, p.mouseX, p.mouseY) / 10;
    const totalWidth = wallSize(numUnits, unitSize, spacing);
    const start = totalWidth / -2 + unitSize / 2;
    for (let y = 0; y < numUnits; y++) {
      for (let x = 0; x < numUnits; x++) {
        p.noiseDetail(2, 0.2);
        let noiseValR = p.noise(
          (x + offsetX + 20) * noiseScale,
          (y + offsetY + 20) * noiseScale
        );
        let noiseValG = p.noise(
          (x + offsetX) * noiseScale,
          (y + offsetY) * noiseScale
        );
        let noiseValB = p.noise(
          (x + offsetX - 20) * noiseScale,
          (y + offsetY - 20) * noiseScale
        );
        const r = noiseValR * 255;
        const g = noiseValG * 255;
        const b = noiseValB * 255;
        p.fill(r, g, b);
        p.push();
        p.translate(
          start + x * (unitSize + spacing),
          start + y * (unitSize + spacing),
          (noiseValR - 0.5) * unitSize * 2
        );
        p.triangle(
          unitSize / -3,
          unitSize / -3,
          unitSize / 3,
          unitSize / -3,
          0,
          unitSize / 4
        );
        p.pop();
      }
    }
  };

  p.draw = () => {
    p.background(0);
    p.ambientLight(128);
    p.pointLight(255, 255, 255, 0, 0, 0);
    const numUnits = 7;
    const unitSize = p.width / 10;
    const spacing = unitSize / 5;
    const wallWidth = wallSize(numUnits, unitSize, spacing);
    p.push();
    p.rotateZ(p.radians(p.frameCount / 10));
    p.push();
    p.translate(0, 0, -wallWidth / 2 - unitSize / 2 - spacing / 2);
    drawWall(numUnits, unitSize, spacing);
    p.pop();

    p.push();
    p.rotateX(Math.PI / 2);
    p.rotateZ(Math.PI);
    p.translate(0, 0, wallWidth / 2 + unitSize / 2 + spacing / 2);
    drawWall(numUnits, unitSize, spacing);
    p.pop();

    p.push();
    p.rotateX(-Math.PI / 2);
    p.rotateZ(Math.PI);

    p.translate(0, 0, wallWidth / 2 + unitSize / 2 + spacing / 2);
    drawWall(numUnits, unitSize, spacing);
    p.pop();
    p.push();
    p.rotateY(Math.PI / 2);
    p.translate(0, 0, wallWidth / 2 + unitSize / 2 + spacing / 2);
    drawWall(numUnits, unitSize, spacing);
    p.pop();
    p.push();
    p.rotateY(-Math.PI / 2);
    p.translate(0, 0, wallWidth / 2 + unitSize / 2 + spacing / 2);
    drawWall(numUnits, unitSize, spacing);
    p.pop();
    p.pop();
  };
};
