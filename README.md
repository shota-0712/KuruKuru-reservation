# LinCal - LINE予約システム

サロン・美容室・治療院・ジム向けのLINE×Googleカレンダー連携予約システム。

## 特徴

- LINE予約・通知機能
- Googleカレンダー連携
- スマホだけで完結する管理画面
- 複数のプランタイプに対応（1名様予約、複数名予約、指名予約）
- チャット機能（追加料金なし）

## 技術スタック

### フロントエンド
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Wouter (ルーティング)

### バックエンド
- Node.js + Express
- Supabase (認証・データベース)
- Stripe (決済)

### インフラ
- Google Cloud Run
- GitHub Actions (CI/CD)

## ローカル開発環境のセットアップ

### 1. 環境変数の設定

`.env.example`をコピーして`.env`を作成:

```bash
cp .env.example .env
```

以下の環境変数を設定してください:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# Stripe Price IDs
STRIPE_PRICE_STANDARD=price_xxxx
STRIPE_PRICE_BUSINESS=price_xxxx
STRIPE_PRICE_PRO=price_xxxx
STRIPE_PRICE_SETUP=price_xxxx

# App
VITE_APP_URL=http://localhost:3000
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:3000 でアプリケーションが起動します。

### 4. ビルド

```bash
pnpm build
```

### 5. 本番モードで起動

```bash
pnpm start
```

## デプロイ

本番環境へのデプロイについては、[DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

### クイックスタート

1. GitHub Secretsに環境変数を設定
2. mainブランチにpush
3. GitHub Actionsが自動的にGCP Cloud Runにデプロイ

詳細な手順とトラブルシューティングは [DEPLOYMENT.md](./DEPLOYMENT.md) を参照。

## プロジェクト構成

```
LinCal-landing/
├── client/              # フロントエンド
│   ├── src/
│   │   ├── components/  # UIコンポーネント
│   │   ├── contexts/    # React Context
│   │   ├── lib/         # ユーティリティ
│   │   └── pages/       # ページコンポーネント
│   └── index.html
├── server/              # バックエンド
│   └── index.ts         # Express サーバー
├── dist/                # ビルド成果物
└── .github/             # GitHub Actions
```

## スクリプト

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - ビルド（フロントエンド + バックエンド）
- `pnpm start` - 本番モードで起動
- `pnpm preview` - ビルド結果のプレビュー
- `pnpm check` - TypeScriptの型チェック
- `pnpm format` - コードフォーマット

## トラブルシューティング

### 画面が真っ白になる

環境変数が設定されていない可能性があります:

1. ローカル開発: `.env`ファイルが正しく設定されているか確認
2. 本番環境: [DEPLOYMENT.md](./DEPLOYMENT.md) を参照

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf node_modules dist
pnpm install
pnpm build
```

## ライセンス

MIT

## お問い合わせ

- LINE公式アカウント: https://lin.ee/tH2mCjG
