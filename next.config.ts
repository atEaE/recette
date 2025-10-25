import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// cloudflare関連の 変数など一部のbindingに対してlocal環境でもアクセスできるように初期化している
// 要するにlocal環境でもcloudflareの環境を再現してね！というおまじない!
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
