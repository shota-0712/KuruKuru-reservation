# デプロイメントガイド

## 問題の原因

本番環境で画面が真っ白になっていた原因は、**Viteのビルド時に環境変数が設定されていなかった**ことです。

Viteは**ビルド時**に `VITE_` で始まる環境変数をバンドルに埋め込みます。そのため、GitHub Actionsのビルドステップで環境変数を設定する必要があります。

## セットアップ手順

### 1. GitHub Secretsの設定

GitHubリポジトリで以下のSecretsを設定してください:

1. リポジトリページに移動
2. `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

#### 必須のSecrets（フロントエンド用）

| Secret名 | 説明 | 例 |
|---------|------|-----|
| `VITE_SUPABASE_URL` | SupabaseプロジェクトURL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase匿名キー | `eyJhbGci...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe公開キー | `pk_live_xxxxx` |
| `VITE_APP_URL` | アプリケーションURL | `https://lincal-reserve.com` |

#### オプションのSecrets

| Secret名 | 説明 |
|---------|------|
| `VITE_ANALYTICS_ENDPOINT` | 分析ツールのエンドポイント |
| `VITE_ANALYTICS_WEBSITE_ID` | 分析ツールのWebサイトID |

#### GCP関連のSecrets

| Secret名 | 説明 |
|---------|------|
| `GCP_PROJECT_ID` | GCPプロジェクトID |
| `GCP_SA_KEY` | GCPサービスアカウントのJSONキー（全体） |

### 2. GCP Secret Managerの設定

バックエンド用の機密情報はGCP Secret Managerに設定します:

```bash
# Supabase Service Role Key
echo -n "your-service-role-key" | gcloud secrets create SUPABASE_SERVICE_ROLE_KEY --data-file=-

# Stripe Secret Key
echo -n "sk_live_xxxxx" | gcloud secrets create STRIPE_SECRET_KEY --data-file=-

# Stripe Webhook Secret
echo -n "whsec_xxxxx" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=-

# Stripe Price IDs
echo -n "price_xxxxx" | gcloud secrets create STRIPE_PRICE_STANDARD --data-file=-
echo -n "price_xxxxx" | gcloud secrets create STRIPE_PRICE_BUSINESS --data-file=-
echo -n "price_xxxxx" | gcloud secrets create STRIPE_PRICE_PRO --data-file=-
echo -n "price_xxxxx" | gcloud secrets create STRIPE_PRICE_SETUP --data-file=-
```

### 3. GCPサービスアカウントの権限設定

Cloud Runにデプロイするサービスアカウントに、Secret Managerへのアクセス権限を付与:

```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:YOUR_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 4. デプロイ

mainブランチにpushすると、GitHub Actionsが自動的にビルド・デプロイを実行します:

```bash
git add .
git commit -m "fix: add environment variables for production build"
git push origin main
```

## トラブルシューティング

### 画面が真っ白のまま

1. ブラウザのコンソール（F12）でエラーを確認
2. `Missing Supabase environment variables` というエラーが出ている場合
   → GitHub Secretsが正しく設定されているか確認
3. GitHub Actionsのログを確認
   → ビルドステップで環境変数が設定されているか確認

### ビルドは成功するが機能しない

1. `.env.production.example` を参考に、すべての必須環境変数が設定されているか確認
2. GCP Secret Managerにバックエンド用の環境変数が設定されているか確認
3. Cloud Runのログを確認: `gcloud run services logs read lincal-landing --region asia-northeast1`

## 環境変数の確認方法

### GitHub Actionsで設定されているか確認

GitHub Actionsのログで、Buildステップを展開して以下のような出力があることを確認:

```
VITE_SUPABASE_URL: https://xxxxx.supabase.co
VITE_STRIPE_PUBLISHABLE_KEY: pk_live_*****
```

### ビルド成果物に埋め込まれているか確認

ローカルで以下のコマンドを実行:

```bash
# ビルド
pnpm run build

# JavaScriptバンドルに環境変数が含まれているか確認
grep -r "supabase" dist/public/assets/
```

## 参考リンク

- [Vite環境変数とモード](https://ja.vite.dev/guide/env-and-mode.html)
- [GitHub Actions Secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets)
- [GCP Secret Manager](https://cloud.google.com/secret-manager/docs)
