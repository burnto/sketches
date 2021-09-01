import { MyP5 } from "../types";
import { hashContains } from "../helpers.js";
import p5, { Color, Element } from "p5";

let sketch = (p: MyP5) => {
  let raySlider: Element;
  let nodeSlider: Element;
  let color1Picker: Element;
  let color2Picker: Element;

  let bgColor = p.color(230);
  let endColor = p.color(100, 10, 128, 255);
  let startColor = p.color(220, 10, 200, 255);
  const canvasSize = 600;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize);
    p.background(bgColor);
    p.noFill();
    p.strokeWeight(1);

    raySlider = p.createSlider(1, 100, 2, 1);
    nodeSlider = p.createSlider(1, 100, 2, 1);
    color1Picker = p.createColorPicker(startColor);
    color2Picker = p.createColorPicker(endColor);

    let gif;
    if (hashContains("gif")) {
      console.log("gif enabled");
      gif = {
        options: { quality: 5 },
        fileName: "bloc-out.gif",
        startLoop: 1,
        endLoop: 2,
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.frameRate(30);
    p.createLoop({
      gif,
      framesPerSecond: 30,
      duration: 5,
    });
  };

  p.draw = () => {
    let numRays = raySlider.value() as number;
    const numPoints = nodeSlider.value() as number;

    const w = p.width;
    const h = p.height;
    p.background(bgColor);
    const density = 0.005;
    for (let i = 0; i < numPoints; i++) {
      const th = (i * Math.PI * 2) / numPoints;
      const x = w / 2 + (Math.sin(th) * w) / 2;
      const y = h / 2 + (Math.cos(th) * h) / 2;

      const n = p.animLoop.noise2D(x * density, y * density) * 0.5 + 0.5;
      p.push();
      p.translate(x, y);
      for (let j = 0; j < numRays; j++) {
        const th2 =
          p.animLoop.theta / (numRays / 2) + (2 * Math.PI * j) / numRays;
        // const color = p.lerpColor(startColor, endColor, j / numRays);

        let c;
        if (j % 2) {
          c = p.color(color1Picker.value() as string);
        } else {
          c = p.color(color2Picker.value() as string);
        }
        p.stroke(c);
        // const color = p.color(
        //   j % 2 === 0 ? color1Picker.value() : color2Picker.value()
        // );
        // p.stroke(color);
        p.push();
        p.rotate(th2);
        p.line(0, 0, 1000, 0);
        p.pop();
      }
      p.pop();
    }
  };
};
new p5(sketch, document.getElementById("blocCanvas")!);

// export default sketch;
