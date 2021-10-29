import p5 from "p5";
import { MyP5 } from "../types";

let sketch = (p: MyP5) => {
  let capture: p5.Element;
  let output: p5.Image;

  const captureWidth = 320;
  const captureHeight = 240;

  var palette = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [0, 255, 255],
    [255, 0, 255],
    [255, 255, 0],
    [255, 255, 255],
    [128, 0, 0],
    [0, 128, 0],
    [0, 0, 128],
    [0, 128, 128],
    [128, 0, 128],
    [128, 128, 0],
    [128, 128, 128],
    [0, 0, 0],
  ];
  function mapColorToPalette(input: number[]): number[] {
    var color, diffR, diffG, diffB, diffDistance;
    let mappedColor = [0, 0, 0];
    var distance = 25000;
    for (var i = 0; i < palette.length; i++) {
      color = palette[i];
      diffR = color[0] - input[0];
      diffG = color[1] - input[1];
      diffB = color[2] - input[2];
      diffDistance = diffR * diffR + diffG * diffG + diffB * diffB;
      if (diffDistance < distance) {
        distance = diffDistance;
        mappedColor = palette[i];
      }
    }
    return mappedColor;
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    capture = p.createCapture(p.VIDEO);
    capture.size(captureWidth, captureHeight);
    capture.hide();
    output = p.createImage(32, 32);
    // p.frameRate(10);
    p.noStroke();
  };

  p.draw = () => {
    p.background(255);
    output.copy(
      capture,
      0,
      0,
      captureWidth,
      captureHeight,
      0,
      0,
      output.width,
      output.height
    );
    output.loadPixels();
    let i;
    const pxSize = p.width / output.width;
    for (let x = 0; x < output.width; x++) {
      for (let y = 0; y < output.height; y++) {
        i = y * output.width * 4 + x * 4;
        let [r, g, b, a] = output.pixels.slice(i, i + 3);
        let [r2, g2, b2] = mapColorToPalette([r, g, b]);
        p.fill(r2, g2, b2);
        p.square(Math.round(x * pxSize), Math.round(y * pxSize), pxSize);
      }
    }
  };
};

export default sketch;
