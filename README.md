# Recette（ルセット）

レシピ管理サービス

## 開発方法

### 必須ツールの準備

```bash
# DBクライアントのインストール
brew install tursodatabase/tap/turso
```

### 開発サーバーの起動

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
- UI Library: Material UI
- Database: Turso

## 導入ライブラリ/ツール

- OpneNext For Cloudflare
  - https://github.com/opennextjs/opennextjs-cloudflare
  - Next.js アプリケーションを Cloudflare にデプロイできるようにするためのアダプター
  - `@cloudflare/next-on-pages`がサポート終了しているため、こちらを採用
- Turso CLI
  - https://docs.turso.tech/cli/introduction
  - `brew install tursodatabase/tap/turso`でインストール可能

## 機能仕様

機能仕様については[docs/spec.md](./docs/spec.md)を参照してください。

## 実装ロードマップ

実装済み内容や、今後の実装予定については[docs/roadmap.md](./docs/roadmap.md)を参照してください。

## 参考資料

