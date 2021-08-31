import { MyP5 } from "./types";

export function hashContains(s: string): boolean {
  return !!window?.location?.hash?.match(s);
}

interface CreateLoopGifOpts {
  render?: boolean;
  options?: { quality: number };
  fileName?: string;
  startLoop?: number;
  endLoop?: number;
  download?: boolean;
  open?: boolean;
}

export function initLoop(p: MyP5, gifOpts: CreateLoopGifOpts = {}) {
  let gif: CreateLoopGifOpts = {
    render: hashContains("render"),
    options: { quality: 5 },
    fileName: "bloc-out.gif",
    startLoop: 1,
    endLoop: 2,
    download: hashContains("download"),
    open: hashContains("open"),
  };
  Object.assign(gif, gifOpts);

  const loopOpts = Object.assign({}, { gif });
  p.createLoop(loopOpts);
  p.animLoop.noiseFrequency(0.1);
}
