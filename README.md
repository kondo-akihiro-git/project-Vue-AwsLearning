# AWS-Founfation Learning

## アプリ概要

AWS Foundationの資格取得にあたって必要なキーワードをまとめて学習できるアプリです。  
※開発後半で説明を修正する予定

## フォルダ構成

- `vue_app`
  - `src/`
    - `assets/` : コンポーネント内で利用する静的リソース  
    - `components/` : 共通化コンポーネント  
    - `views/` : ページコンポーネント  
    - `router/` : ルーティング設定  
      - `index.js` : ルート定義  
    - `App.vue` : ルートコンポーネント（修正なし）  
    - `main.js` : エントリーポイント（修正なし）  

  - `.gitignore` : Git管理しないファイルの指定  
  - `public/` : `/<ファイル名>` で直接アクセス可能な静的ファイルを格納（修正なし）  
  - `node_modules/` : 依存パッケージがインストールされるディレクトリ（修正なし）  
  - `babel.config.js` : Babel の設定ファイル（修正なし）  
  - `jsconfig.json` : JavaScriptの設定ファイル（修正なし） 
  - `package-lock.json` : プロジェクトの依存関係の固定用ファイル（修正なし）  
  - `package.json` : プロジェクトの依存関係や設定（修正なし）  
  - `vue.config.js` : Vue CLI の設定ファイル（修正なし）

- `backend`
  - `node_modules/` : 依存パッケージがインストールされるディレクトリ（修正なし） 
  - `package-lock.json` : プロジェクトの依存関係の固定用ファイル（修正なし）  
  - `package.json` : プロジェクトの依存関係や設定（修正なし） 
  - `server.js` : APIのメイン
  - `.env` : 環境変数設定
  - `test` : APIテストコード

## ブランチ

- `main` : マージ先ブランチ  
- `feature` : 開発とプルリクエスト送り元のブランチ

## その他メモ

- express : サーバーを作成するためのライブラリ  
- cors : CORSの制御を行うライブラリ  
- REST Client : APIテスト用拡張機能

- Notionにおけるテーブル利用でのプロパティ名は既存のtitleなどのプロパティにすると、勝手にNotionAPI内部でデータ構造をtitle扱いに変更することがある

## 残りのタスク

- 画面デザイン修正(5)  
- デプロイ手順確認(8)  
 - ローカルホスト対応(5)
- データの調整(8)
- typeごとの表示変更修正(4)
- ロゴ修正(3)