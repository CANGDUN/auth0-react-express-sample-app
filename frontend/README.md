# React + TypeScript + Vite

- `npm create vite` で作成した、React によるフロントエンドアプリ

## 依存関係のインストール

```sh
npm install
```

## 環境変数の設定

`.env` ファイルに以下追記する

```env
VITE_APP_AUTH0_DOMAIN={AUTH0_TENANT_ID}.{REGION}.auth0.com
VITE_APP_AUTH0_CLIENT_ID={AUTH0_CLIENT_ID}
VITE_APP_AUTH0_AUDIENCE={AUTH0_API_IDENTIFIER}
VITE_APP_API_BASE_URL={BACKEND_API_URL}
```

## 起動

```sh
npm run dev
```
