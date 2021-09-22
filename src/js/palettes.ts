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
  {
    name: "vintage 4",
    bg: "#161616",
    c1: "#346751",
    c2: "#C84B31",
    c3: "#ECDBBA",
  },
  {
    name: "vintage 5",
    bg: "#2F5D62",
    c1: "#5E8B7E",
    c2: "#A7C4BC",
    c3: "#DFEEEA",
  },
  {
    name: "vintage 5",
    bg: "#F9DFDC",
    c1: "#0A81AB",
    c2: "#0C4271",
    c3: "#000000",
  },
  {
    name: "vintage 5",
    bg: "#F3F4ED",
    c1: "#536162",
    c2: "#424642",
    c3: "#C06014",
  },
];

export function randomPalette() {
  return randomChoice(palettes);
}

export function randomColor(p: Palette) {
  return randomChoice([p.c1, p.c2, p.c3]);
}
