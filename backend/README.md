# express-ts

- 認証が不要なパスと、必要なパスを含む Express によるバックエンド API

## 依存関係のインストール

```sh
npm install
```

## 環境変数の設定

`.env` ファイルに以下追記する

```env
AUTH0_DOMAIN={AUTH0_TENANT_ID}.{REGION}.auth0.com
AUTH0_AUDIENCE={AUTH0_API_IDENTIFIER}
PORT={PORT_NO}
ALLOWED_ORIGIN={FRONTEND_URL}
```

## 起動

```sh
npm run dev
```
