# V1グランプリ - プレイヤーコメンテーターゲーム

nishio: V1グランプリて1時間で作ったゲームです。制限時間終了時のものはv1タグを打ってあります。その時点でDevinからPR#2が出ていたがマージされてない状態でした。

ブラウザ上で動作するタイムトライアル形式のクイズゲームです。プレイヤーはコメンテーターとして、出題されるお題に素早く回答する必要があります。

## 特徴

- 1分間に12問（5秒ごとに1問）出題されるタイムトライアル形式
- 間違った選択肢を選ぶと即終了するスリリングなゲーム性
- 問題データはJSON形式で管理され、カスタマイズ可能
- 3段階の難易度設定（簡単、普通、難しい）
- ハイスコア機能でリプレイ価値を向上

## 技術スタック

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## 開発環境のセットアップ

### 必要条件

- Node.js 18.0.0以上
- npm 9.0.0以上

### インストール手順

```bash
# リポジトリをクローン
git clone https://github.com/nishio/v1grandprix.git
cd v1grandprix

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルドと本番環境へのデプロイ

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 問題データのカスタマイズ

問題データは `public/data/questions.json` ファイルで管理されています。以下の形式でJSONデータを編集することで、問題をカスタマイズできます：

```json
{
  "questions": [
    {
      "id": 1,
      "text": "問題文をここに入力",
      "options": [
        {
          "text": "選択肢1",
          "points": 10
        },
        {
          "text": "選択肢2",
          "points": 5
        },
        {
          "text": "選択肢3",
          "points": 3
        },
        {
          "text": "選択肢4",
          "points": 1
        }
      ],
      "correctOptionIndex": 0
    }
  ]
}
```

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
