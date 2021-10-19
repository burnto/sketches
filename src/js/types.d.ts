import p5 from "p5";
import createLoop from "p5.createLoop/dist/p5.createLoop";

interface MyP5 extends p5 {
  createLoop(any: any);
  animLoop: any;
}


interface FuncP5 extends MyP5 {
  Ease: any;
  Gen: any;
}