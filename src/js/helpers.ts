export function hashContains(s: string): boolean {
  return !!window?.location?.hash?.match(s);
}
