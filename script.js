import p5 from "p5";


let sketch = (p) => {
  p.setup = () => {
    p.createCanvas(1000, 1000);
    p.background(0);
  }

  p.draw = () => {
    p.background(0);
    p.ellipse(50, 50, 80, 80);
  }
};

new p5(sketch, window.document.getElementById('container'));
