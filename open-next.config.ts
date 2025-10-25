import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// cloudflare workers上でのOpenNextの設定を定義
// open nextについては、docs/nextjs/opennext.md を参照
export default defineCloudflareConfig({
  // cacheの保存先としてR2を使う
  incrementalCache: r2IncrementalCache,
});
