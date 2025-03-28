import os
import requests
from dotenv import load_dotenv

# 環境変数を読み込む
load_dotenv(dotenv_path='./.env')

print("NOTION_API_TOKEN:", os.getenv('NOTION_API_KEY'))
# 環境変数からAPIトークンを取得
api_token = os.getenv('NOTION_API_KEY')
database_id = os.getenv('NOTION_WORD_MST_DATABASE_ID')

# トークンが設定されているかチェック
if not api_token:
    print("APIトークンが設定されていません。")
    exit()

# Notion APIエンドポイント（データベース情報取得）
url = f"https://api.notion.com/v1/databases/{database_id}"

# リクエストヘッダー
headers = {
    "Authorization": f"Bearer {api_token}",
    "Notion-Version": "2021-05-13"  # Notion APIのバージョン
}

# APIリクエストを送信
response = requests.get(url, headers=headers)

# 結果の確認
if response.status_code == 200:
    print("---------------------------------------------------------------")
    print("APIトークンは有効です。")
    print("---------------------------------------------------------------")
    print("レスポンス:", response.json())
else:
    print("---------------------------------------------------------------")
    print(f"APIトークンが無効です。ステータスコード: {response.status_code}")
    print("---------------------------------------------------------------")
    print("エラーレスポンス:", response.json())
