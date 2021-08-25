import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth(), p.WEBGL);
    p.background(100);
    p.noCursor();
    p.noStroke();
  };

  let distance = 60;
  let r = 0;
  p.draw = () => {
    p.background(20);
    p.noStroke();
    let locX = p.mouseX - p.width / 2;
    let locY = p.mouseY - p.height / 2;
    p.ambientLight(60, 60, 60);
    p.pointLight(255, 255, 255, locX, locY, 50);

    p.specularMaterial(250);
    p.shininess(20);

    if (p.mouseIsPressed) {
      distance = Math.min(80, distance * 1.04);
      r += 4;
    } else {
      distance = Math.max(50, distance * 0.98);
      r += 1;
    }
    p.rotate(p.radians(r));
    for (var sx = -2; sx <= 2; sx++) {
      for (var sy = -2; sy <= 2; sy++) {
        p.push();
        p.translate(sx * distance, sy * distance, 0);
        p.sphere(20);
        p.pop();
      }
    }
  };
};
