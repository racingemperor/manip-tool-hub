export function assetPath(path?: string) {
  if (!path) return "";
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${cleaned}`;
}
