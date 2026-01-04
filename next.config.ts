import type { NextConfig } from "next";

const inferredRepo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const inferredBasePath =
  inferredRepo && !inferredRepo.endsWith(".github.io") ? `/${inferredRepo}` : "";
const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined ? process.env.NEXT_PUBLIC_BASE_PATH : inferredBasePath;

const normalizeBasePath = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") return "";
  const withoutTrailing = trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
  return withoutTrailing.startsWith("/") ? withoutTrailing : `/${withoutTrailing}`;
};

const basePath = normalizeBasePath(rawBasePath);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
