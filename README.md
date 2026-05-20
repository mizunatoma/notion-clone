# Notion Clone

NotionライクなノートアプリをReact + TypeScriptで実装したポートフォリオプロジェクトです。

## デモ

Vercelにデプロイ済み：[https://notion-clone-umber-nu.vercel.app/signin](https://notion-clone-umber-nu.vercel.app/signin)
※ バックエンド（Render）はスリープ状態の場合があります

---

## 機能

- ノートの作成・編集・削除
- 子ノートの再帰的管理（階層構造）
- BlockNoteエディタによるリッチテキスト編集
- キーワード検索（デバウンス処理付き）
- JWT認証（ログイン・ログアウト）

---

## 技術スタック

### Frontend

| 技術             | バージョン | 用途                   |
| ---------------- | ---------- | ---------------------- |
| React            | 19         | UIライブラリ           |
| TypeScript       | 6          | 型安全な開発           |
| Vite             | 8          | ビルドツール           |
| React Router DOM | v7         | ルーティング           |
| BlockNote        | -          | リッチテキストエディタ |
| cmdk             | -          | コマンドパレット       |
| Jotai            | -          | 状態管理               |
| Axios            | -          | HTTPクライアント        |
| react-icons      | -          | アイコンライブラリ     |
| use-debounce     | -          | デバウンスフック       |

### Backend (参照用API)

| 技術           | 用途         |
| -------------- | ------------ |
| Express v5     | APIサーバー  |
| TypeORM v0.3   | ORM          |
| SQLite3        | データベース |
| JWT / bcryptjs | 認証         |

### インフラ

| サービス | 用途                                 |
| -------- | ------------------------------------ |
| Vercel   | フロントエンドホスティング           |
| Render   | バックエンドAPIサーバー              |
| AWS EC2  | フロント・バックエンド両方をデプロイ |

---

## 起動方法

### 前提条件

- Node.js 18以上
- npm

### インストール

```bash
git clone https://github.com/your-username/notion-clone.git
cd notion-clone
npm install
```

### 環境変数

`.env`ファイルをプロジェクトルートに作成してください：

```env
VITE_API_URL=http://localhost:3000
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

---

## ディレクトリ構成

```
src/
├── components/       # 共通UIコンポーネント
│   └── ui/           # shadcn/ui系プリミティブコンポーネント
├── modules/          # 機能モジュール（auth・notes・usersなど）
├── pages/            # ページコンポーネント
├── lib/              # ユーティリティ・APIクライアント
├── styles/           # グローバルスタイル
├── App.tsx
├── Layout.tsx
└── main.tsx
```

---

## ライセンス

MIT
