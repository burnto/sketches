import { MyP5 } from "../types";

export default (p: MyP5) => {
  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth(), p.WEBGL);
    p.background(100);
    p.noCursor();
    p.noStroke();
  };

  const shape = () => {
    p.push();
    p.sphere(10);
    p.cylinder(3, 60);
    p.push();
    p.rotate(Math.PI / 2, [1, 0, 0]);
    p.cylinder(3, 60);
    p.pop();
    p.push();
    p.rotate(Math.PI / 2, [0, 0, 1]);
    p.cylinder(3, 60);
    p.pop();
    p.pop();
  };

  let distance = 80;
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

    r += p.radians(1);
    for (var sx = -2; sx <= 2; sx++) {
      for (var sy = -2; sy <= 2; sy++) {
        p.push();
        p.translate(sx * distance, sy * distance, 0);
        p.rotateX(r);
        p.rotateY(Math.PI / 3);
        p.rotateY(Math.PI / 10);
        shape();
        p.pop();
      }
    }
  };
};
