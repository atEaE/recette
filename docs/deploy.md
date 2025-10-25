# deploy手順

cloudflare workers への deploy手順を記載します。

## 事前準備

cloudflareへdeployするには`wrangler cli`で事前ログインしておく必要があります.  
`wrangler`自体は、package.jsonのdevDependenciesに含まれているため、git cloneしたばかりの場合は以下のコマンドでインストールしてください。

```bash
npm ci
```

その後、以下のコマンドでcloudflareへログインします。

```bash
npx wrangler login
```

## preview環境へdeploy

deploy前にlocal環境でpreview動作確認を行うことができます。  
（これは実際にdeployしているわけではなく、local環境でcloudflare workersの動作をエミュレートしているだけです）. 

```bash
npm run preview
```

上記コマンドを実行後、[http://localhost:8787](http://localhost:8787)にアクセスして動作確認を行ってください。

## 本番環境へdeploy

本番環境へdeployするには以下のコマンドを実行します。

```bash
npm run deploy
```