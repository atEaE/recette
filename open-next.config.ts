import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// cloudflare workers上でのOpenNextの設定を定義
// open nextについては、docs/nextjs/opennext.md を参照
// R2キャッシュは個人利用のため不要として設定なし
export default defineCloudflareConfig({
  // cacheの保存は個人利用のサービスのためしない。
  // 今後、必要になったらR2バケットを作成して設定する
  // incrementalCache: r2IncrementalCache,
});
