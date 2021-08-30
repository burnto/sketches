import { Color } from "p5";
import { MyP5 } from "../types";

export default (p: MyP5) => {
  let density: number;
  let currentX: number;
  let currentY: number;
  let color: Color;

  p.setup = () => {
    p.createCanvas(p.currentWidth(), p.currentWidth());
    p.noFill();
    p.background(30);
    p.stroke(220);
    p.frameRate(120);
    p.loadPixels();
    density = p.pixelDensity();
    currentX = p.width / 2;
    currentY = p.height / 2;
    color = p.color(255, 255, 255);
  };

  let direction = 1;

  const turnLeft = () => {
    direction = (direction + 1) % 4;
  };
  const turnRight = () => {
    direction = direction === 0 ? 3 : (direction - 1) % 4;
  };
  const directionVec = () => {
    switch (direction % 4) {
      case 0:
        return [1, 0];
        break;
      case 1:
        return [0, -1];
        break;
      case 2:
        return [-1, 0];
        break;
      case 3:
        return [0, 1];
        break;
      default:
        throw `invalid direction ${direction}`;
    }
  };

  const pointsInRange = (first: number, last: number): [number, number][] => {
    let len = Math.abs(last - first) + 1;
    let ret = Array(len);
    const s = last < first ? -1 : 1;
    let dv = directionVec();
    let j = 0;
    for (let i = first; i != last + s; i += s) {
      ret[j] = [currentX + dv[0] * i, currentY + dv[1] * i];
      j += 1;
    }
    return ret;
  };

  const ptInBounds = (pt: [number, number]): boolean => {
    return pt[0] >= 0 && pt[1] >= 0 && pt[0] < p.width && pt[1] < p.height;
  };

  const obstacleInRange = (first: number, last: number): boolean => {
    const pts = pointsInRange(first, last);
    return !!pts.find((pt) => {
      return p.get(...pt)[0] > 50 || !ptInBounds(pt);
    });
  };

  let walk = () => {
    const dv = directionVec();
    currentX += dv[0];
    currentY += dv[1];
  };

  let lookbackThresh = 60;

  p.draw = () => {
    p.set(currentX, currentY, color);
    if (obstacleInRange(1, 100)) {
      console.log("right");
      turnRight();
    } else {
      console.log("walk");
      walk();
    }
    p.updatePixels();
  };
};
