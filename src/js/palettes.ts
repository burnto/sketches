import { randomChoice } from "./helpers";

interface Palette {
  name: string;
  bg: string;
  c1: string;
  c2: string;
  c3: string;
}

export const palettes: Array<Palette> = [
  {
    name: "vintage",
    bg: "#E7E0C9",
    c1: "#C1CFC0",
    c2: "#6B7AA1",
    c3: "#11324D",
  },
  {
    name: "vintage 2",
    bg: "#716F81",
    c1: "#B97A95",
    c2: "#F6AE99",
    c3: "#F2E1C1",
  },
  {
    name: "vintage 3",
    bg: "#000000",
    c1: "#BD4B4B",
    c2: "#EFB7B7",
    c3: "#EEEEEE",
  },
];

export function randomPalette() {
  return randomChoice(palettes);
}

export function randomColor(p: Palette) {
  return randomChoice([p.c1, p.c2, p.c3]);
}
