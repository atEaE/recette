# Recette（ルセット）

レシピ管理サービス

## 開発方法

### 開発サーバーの機能

```
npm ci 
npm run dev
```

[http://localhost:3000](http://localhost:3000) にアクセスしてください。


## システム・アーキテクチャ

- Framework: Next.js(v16)
- Language: Typescript
- Lint Format: biome
- Host: cloudflare pages

## 導入ライブラリ

- OpneNext For Cloudflare
  - https://github.com/opennextjs/opennextjs-cloudflare
  - Next.js アプリケーションを Cloudflare にデプロイできるようにするためのアダプター
  - `@cloudflare/next-on-pages`がサポート終了しているため、こちらを採用

## 参考資料

