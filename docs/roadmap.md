#　実装ロードマップ

主なな実装予定や計画を記載します.

## Phase　1: 基本的な開発環境/Deploy環境整備

- [x] cloudflare workers上でNext.jsアプリケーションを動作させるためのOpenNextの導入
  - [x] OpenNext for CloudflareがNext.js v15対応なので合わせる
- [x] local環境からnextアプリケーションをdevelopできるようにする 
- [x] 基本的なPWA用にmanifest.tsの設定

## Phase 2: 基本機能の実装

- [x] レシピ一覧画面の実装
  - [x] とりあえずのmock データで良いので、レシピ一覧画面の参照機能を実装する
  - [ ] mockデータをAPI経由で取得するようにする