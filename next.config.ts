import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// cloudflare関連の 変数など一部のbindingに対してlocal環境でもアクセスできるように初期化している
// 要するにlocal環境でもcloudflareの環境を再現してね！というおまじない!
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      // 外部画像を使っているので、そのドメインを許可する設定
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
