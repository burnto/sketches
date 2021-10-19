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

Palettes.set("barbie", {
  "Antique Brass": "#cb997e",
  "Desert Sand": "#ddbea9",
  "Champagne Pink": "#ffe8d6",
  "Ash Gray": "#b7b7a4",
  Artichoke: "#a5a58d",
  Ebony: "#6b705c",
});

Palettes.set("sick-rainbow", {
  Red: "#ff0000",
  "Dark Orange": "#ff8700",
  "Cyber Yellow": "#ffd300",
  "Chartreuse Traditional": "#deff0a",
  "Spring Bud": "#a1ff0a",
  "Medium Spring Green": "#0aff99",
  "Electric Blue": "#0aefff",
  Azure: "#147df5",
  "Han Purple": "#580aff",
  "Electric Purple": "#be0aff",
});

/* Object */
Palettes.set("reds", {
  "Persian Plum": "#641220",
  Burgundy: "#6e1423",
  "Antique Ruby": "#85182a",
  "Crimson UA": "#a11d33",
  "Crimson UA 2": "#a71e34",
  "Red NCS": "#b21e35",
  "Red NCS 2": "#bd1f36",
  Cardinal: "#c71f37",
  Crimson: "#da1e37",
  "Rose Madder": "#e01e37",
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
