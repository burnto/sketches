import { MyP5 } from "../types";
import { hashContains, randomInt } from "../helpers";

interface Square {
  x: number;
  y: number;
  s: number;
}

let sketch = (p: MyP5) => {
  p.colorMode(p.HSB, 1, 1, 1, 1);
  const duration = 3;
  const squares = new Array<Square>();

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(30);
    p.strokeWeight(1);
    p.noFill();
    p.pixelDensity(1);

    let gif;
    if (hashContains("gif")) {
      gif = {
        startLoop: 1,
        endLoop: 1 + duration,
        fileName: "camps",
        options: {
          quality: 5,
        },
        download: hashContains("download"),
        open: hashContains("open"),
      };
    }
    p.createLoop({
      duration,
      gif,
    });

    for (let i = 0; i < 100; i++) {
      squares.push({
        x: Math.random(),
        y: Math.random(),
        s: Math.random() / 3,
      });
    }
  };

  const k1 = (i: number) => {
    p.pixels[i] = p.pixels[(i + randomInt(0, 3)) % p.pixels.length];
    p.pixels[i + 1] = p.pixels[(i + randomInt(0, 3)) % p.pixels.length];
    p.pixels[i + 2] = p.pixels[(i + randomInt(0, 3)) % p.pixels.length];
    p.pixels[i + 3] = p.pixels[(i + randomInt(0, 3)) % p.pixels.length];
  };

  const k2 = (i: number) => {
    p.pixels[i] =
      p.pixels[(i + p.width * 4 * randomInt(0, 5)) % p.pixels.length];
    p.pixels[i + 1] =
      p.pixels[(i + p.width * 4 * randomInt(0, 5)) % p.pixels.length];
    p.pixels[i + 2] =
      p.pixels[(i + p.width * 4 * randomInt(0, 5)) % p.pixels.length];
    p.pixels[i + 3] =
      p.pixels[(i + p.width * 4 * randomInt(0, 5)) % p.pixels.length];
  };

  const k3 = (i: number) => {
    p.pixels[i] =
      p.pixels[
        (i + randomInt(4, 5) + p.width * 4 * randomInt(0, 1)) % p.pixels.length
      ];
    p.pixels[i + 1] =
      p.pixels[
        (i + randomInt(1, 2) + p.width * 4 * randomInt(0, 1)) % p.pixels.length
      ];
    p.pixels[i + 2] =
      p.pixels[
        (i + randomInt(1, 2) + p.width * 4 * randomInt(0, 0)) % p.pixels.length
      ];
    p.pixels[i + 3] =
      p.pixels[
        (i + randomInt(2, 3) + p.width * 4 * randomInt(0, 0)) % p.pixels.length
      ];
  };

  p.draw = () => {
    const flip = Math.random();
    if (
      flip < 0.001 ||
      p.frameCount <= 1 ||
      p.animLoop.progress <= 0.01 ||
      p.animLoop.progress >= 0.99
    ) {
      p.background(0);
      p.loadPixels();
      for (let i = 0; i < p.pixels.length; i += 4) {
        k1(i);
      }
      p.updatePixels();
      // } else if (flip < 0.09) {
      //   for (let i = 0; i < p.pixels.length; i += 4) {
      //     k2(i);
      //   }
      //   p.updatePixels();
    } else {
      for (let i = 0; i < p.pixels.length; i += 4) {
        k3(i);
      }
      p.updatePixels();
    }
  };
};

export default sketch;
