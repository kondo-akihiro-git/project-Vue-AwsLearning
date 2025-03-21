# アプリ名：AWS CLF Learning

## アプリ概要

AWS CLF(AWS CloudPractitionar)の資格取得にあたって必要なキーワードをまとめて学習できるアプリです。 

## 主な画面

- `ホーム画面` : 学習画面への遷移とお知らせ画面への遷移ができる画面です。

<kbd><img style="border: solid;" width="1334" alt="top-aws-git" src="https://github.com/user-attachments/assets/4fcfd300-a264-4c55-8c7e-5ae91c87985f" /></kbd>
</br></br>

- `カテゴリー＆ワード一覧画面` : 学習ワードをカテゴリ別で一覧を確認できる画面です。

<kbd><img width="1394" alt="home-aws-git" src="https://github.com/user-attachments/assets/d5121d62-237a-4ad7-9fbc-41616e9216ec" /></kbd>
</br></br>

- `ワード詳細画面` : 資格取得に向けた学習ワードの詳細と関連度の高いワードを確認できる画面です。
- `既存ワードの修正依頼画面` : 既存のワードについて改善依頼、修正依頼を送信できる画面です。  
- `新規ワードの追加申請画面` : 新規でワードを追加申請できる画面です。  

<kbd><img width="1382" alt="req-aws-git" src="https://github.com/user-attachments/assets/6ac92a8b-ca76-41af-8fcb-5a8a180f70ee" /></kbd>
</br></br>

- `お知らせ画面` : ユーザーが管理者からのお知らせを受けることができる画面です。

<kbd><img width="1387" alt="news-aws-git" src="https://github.com/user-attachments/assets/acea064d-e9c8-485f-8699-442b8632ccad" /></kbd>
</br></br>

- `管理者画面` : 主にユーザーへのお知らせの送信とDBデータの確認ができる画面です。  

## フォルダ構成

- `vue_app`
  - `src/`
    - `assets/` : コンポーネント内で利用する静的リソース  
    - `components/` : 共通化コンポーネント  
    - `views/` : ページコンポーネント  
    - `router/` : ルーティング設定  
      - `index.js` : ルート定義  
    - `App.vue` : ルートコンポーネント  
    - `main.js` : エントリーポイント  

  - `.gitignore` : Git管理しないファイルの指定  
  - `public/` : `/<ファイル名>` で直接アクセス可能な静的ファイルを格納  
  - `node_modules/` : 依存パッケージがインストールされるディレクトリ  
  - `babel.config.js` : Babel の設定ファイル  
  - `jsconfig.json` : JavaScriptの設定ファイル 
  - `package-lock.json` : プロジェクトの依存関係の固定用ファイル  
  - `package.json` : プロジェクトの依存関係や設定  
  - `vue.config.js` : Vue CLI の設定ファイル
  - `.env` : 環境変数設定

- `backend`
  - `node_modules/` : 依存パッケージがインストールされるディレクトリ 
  - `package-lock.json` : プロジェクトの依存関係の固定用ファイル  
  - `package.json` : プロジェクトの依存関係や設定 
  - `server.js` : APIのメイン
  - `.env` : 環境変数設定
  - `test` : APIテストコード

## 主な技術要件

- Vue 3 : フロントでのJavaScriptフレームワーク
- Vue Router : ルーティング制御
- Bulma : CSSフレームワーク（デザイン統一）
- Axios : API通信
- Node.js : JavaScriptの実行環境
- express : サーバーを作成するためのライブラリ  
- cors : CORSの制御を行うライブラリ  
- REST Client : APIテスト用拡張機能
- Vercel : フロントデプロイ
- Render : サーバーデプロイ

## 残りのタスク

- データの調整(8)
