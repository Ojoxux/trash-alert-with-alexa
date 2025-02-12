# Trash Alert

自分の住んでる地域のゴミ収集日をお知らせする Alexa スキル

## 概要

この Alexa スキルは、ゴミ収集予定を音声で案内します。「アレクサ、ゴミ情報を開いて」と話しかけると、その日のゴミ収集情報を教えてくれます。

## 機能

- 今日のゴミ収集情報の案内
- 収集時間（午前 8 時まで）の案内
- エラー時の適切なメッセージ表示

## 技術スタック

- TypeScript
- Alexa Skills Kit SDK for Node.js
- Supabase (データベース)
- AWS Lambda

## 開発環境のセットアップ

1. **必要な環境**

   - Node.js (v14 以上)
   - Yarn
   - AWS CLI
   - Alexa Developer Console アカウント

2. **インストール**

   ```bash
   git clone [リポジトリURL]
   cd trash-alert
   yarn install
   ```

3. **環境変数の設定**
   ```bash
   # .env ファイルを作成
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

## ビルドとデプロイ

1. **ビルド**

   ```bash
   yarn build
   ```

2. **デプロイパッケージの作成**

   ```bash
   yarn deploy
   ```

   これにより`deployment-package.zip`が作成されます。

3. **AWS Lambda へのデプロイ**
   - 作成された`deployment-package.zip`を AWS Lambda コンソールにアップロード

## Alexa スキルの設定

1. **Alexa Developer Console**

   - 新規スキルを作成
   - インテントモデルをインポート
   - エンドポイントに Lambda ARN を設定

2. **テスト**
   - 開発者モードでテスト
   - 「アレクサ、ゴミ情報を開いて」で起動

## 利用可能なコマンド

- `yarn build`: TypeScript のコンパイル
- `yarn start`: ローカルでの実行
- `yarn deploy`: デプロイパッケージの作成
