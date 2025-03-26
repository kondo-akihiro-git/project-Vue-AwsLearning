import os
import requests
from dotenv import load_dotenv
import re

# .env読み込み
load_dotenv()

# APIキーとDB IDの設定
API_KEY = os.getenv("NOTION_API_KEY")
WORD_MST_DB_ID = os.getenv("NOTION_WORD_MST_DATABASE_ID")
CATEGORY_MST_DB_ID = os.getenv("NOTION_CATEGORY_MST_DATABASE_ID")
TYPE_MST_DB_ID = os.getenv("NOTION_TYPE_MST_DATABASE_ID")

# Notion APIのヘッダー
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

# データベースからデータ取得
def get_notion_data(database_id):
    url = f"https://api.notion.com/v1/databases/{database_id}/query"
    try:
        response = requests.post(url, headers=HEADERS)
        if response.status_code != 200:
            print(f"❌ データの取得に失敗しました: {response.status_code}, エラー: {response.text}")
            return []
        data = response.json()["results"]
        print(f"✅ 取得データ件数: {len(data)}")
        return data
    except Exception as e:
        print(f"❗️ データ取得エラー: {e}")
        return []


# IDマッピング作成
def create_id_mapping(data, key_name):
    id_mapping = {}
    try:
        for item in data:
            # IDと名前を正しく取得できているかを確認
            url = item["url"]
            item_id = item["properties"]["id"]["title"][0]["text"]["content"]
            # URLからUUID部分を抽出
            match = re.search(r"notion.so/([a-f0-9\-]+)-([a-f0-9\-]+)", url)
            if match:
                uuid = match.group(2)
                id_mapping[item_id] = uuid
            else:
                print(f"❌ URL形式が不正です: {url}")
            
        return id_mapping
    except Exception as e:
        print(f"❗️ マッピング作成エラー: {e}")
        return {}

# Word MSTのレコード更新
def update_word_mst_record(record_id, type_id, category_id):
    url = f"https://api.notion.com/v1/pages/{record_id}"
    # type_id と category_id が None の場合は空のリレーションではなく、キーを削除
    payload = {"properties": {}}

    if type_id:
        payload["properties"]["type_mst"] = {"relation": [{"id": type_id}]}
    if category_id:
        payload["properties"]["category_mst"] = {"relation": [{"id": category_id}]}

    try:
        response = requests.patch(url, headers=HEADERS, json=payload)
        if response.status_code == 200:
            print(f"✅ 更新成功: {record_id}")
            print(f"  ➡️ type_mst: {type_id if type_id else '未設定'}")
            print(f"  ➡️ category_mst: {category_id if category_id else '未設定'}")
        else:
            print(f"❌ 更新失敗: {record_id}, エラー: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❗️ 更新エラー: {e}")

# プロパティの値を取得する関数
def get_property_value(property_data):
    try:
        # 各プロパティが存在するか確認し、適切に返す
        if "number" in property_data:
            return str(property_data["number"])
        elif "rich_text" in property_data and property_data["rich_text"]:
            return property_data["rich_text"][0]["text"]["content"]
        elif "select" in property_data and property_data["select"]:
            return property_data["select"]["name"]
        elif "title" in property_data and property_data["title"]:
            return property_data["title"][0]["text"]["content"]
        return None
    except Exception as e:
        print(f"❗️ プロパティ取得エラー: {e}")
        return None

# メイン処理
def main():
    try:
        # 各テーブルのデータ取得
        word_data = get_notion_data(WORD_MST_DB_ID)
        category_data = get_notion_data(CATEGORY_MST_DB_ID)
        type_data = get_notion_data(TYPE_MST_DB_ID)

        if not word_data or not category_data or not type_data:
            print("⚠️ データ取得に失敗したため、処理を終了します。")
            return

        # マッピング作成
        category_mapping = create_id_mapping(category_data, "category")
        type_mapping = create_id_mapping(type_data, "type")

        # Word MSTのデータ更新
        for word in word_data:
            record_id = word["id"]
            properties = word["properties"]

            # typeIdとcategoryIdの取得
            type_id_str = get_property_value(properties["typeId"])
            category_id_str = get_property_value(properties["categoryId"])

            # IDに一致するリレーションID取得
            # print(f"type_mapping ---------- : {type_mapping}")
            # print(f"str(type_id_str) ---------- : {str(type_id_str)}")
            type_uuid = type_mapping.get(str(type_id_str))
            category_uuid = category_mapping.get(str(category_id_str))

            print(f"🔄 更新対象: ID={record_id}, typeUUId={type_uuid}, categoryUUId={category_uuid}")
            
            # 実際に更新処理実行
            update_word_mst_record(record_id, type_uuid, category_uuid)

    except Exception as e:
        print(f"❗️ メイン処理エラー: {e}")

if __name__ == "__main__":
    main()
