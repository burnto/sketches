import p5 from "p5";
import { randomChoice } from "./helpers";

type Palette = { [colorName: string]: string };

export const Palettes = new Map<string, Palette>();

Palettes.set("space", {
  Cultured: "#f3f2f4",
  Beaver: "#af8471",
  "English Violet": "#695276",
  "Russian Violet": "#392a55",
  "Smoky Black": "#070601",
});

Palettes.set("regal", {
  "Orange Yellow Crayola": "#efcb68",
  Honeydew: "#e1efe6",
  "Ash Gray": "#aeb7b3",
  "Smoky Black": "#070601",
  "Blue NCS": "#0090c1",
});

Palettes.set("retro-superhero", {
  /* Object */
  "Prussian Blue": "#003049",
  "Maximum Red": "#d62828",
  Orange: "#f77f00",
  "Maximum Yellow Red": "#fcbf49",
  "Lemon Meringue": "#eae2b7",
});

export function randomPalette(): Palette {
  return randomChoice([...Palettes.values()]);
}

export function paletteColors(palette: any): string[] {
  return Object.values(palette);
}

export function p5Colors(palette: Palette): p5.Color[] {
  return paletteColors(palette).map((s) => {
    let r = parseInt(s.substr(1, 2), 16);
    let g = parseInt(s.substr(3, 2), 16);
    let b = parseInt(s.substr(5, 2), 16);
    console.log(r, g, b);
    const c = new p5.Color();
    c.setRed(r);
    c.setGreen(g);
    c.setBlue(b);
    return c;
  });
}

export function randomColor(palette: Palette): string {
  return randomChoice(paletteColors(palette));
}
