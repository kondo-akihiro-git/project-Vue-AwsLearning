require('dotenv').config();
const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const wordDatabaseId = process.env.NOTION_WORD_MST_DATABASE_ID;
const categoryDatabaseId = process.env.NOTION_CATEGORY_MST_DATABASE_ID;
const requestDatabaseId = process.env.NOTION_REQUEST_MST_DATABASE_ID;
const typeDatabaseId = process.env.NOTION_TYPE_MST_DATABASE_ID;


// app.get('/notion-word', async (req, res) => {
//     try {
//         const response = await notion.databases.query({ database_id: wordDatabaseId });
//         res.json(response.results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'ワードデータの取得に失敗しました。' });
//     }
// });

app.get('/notion-word', async (req, res) => {
    try {
        let allResults = [];
        let hasMore = true;
        let startCursor = undefined;

        // 上限の100件以上あるか確認
        while (hasMore) {
            const response = await notion.databases.query({
                database_id: wordDatabaseId,
                start_cursor: startCursor, // start_cursorを使って次のページを取得
            });

            allResults = allResults.concat(response.results); // 取得した結果を全て配列に追加

            hasMore = response.has_more; // 次のページがあるか確認
            startCursor = response.next_cursor; // 次のページのカーソルを設定
        }

        res.json(allResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ワードデータの取得に失敗しました。' });
    }
});


app.get('/notion-category', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: categoryDatabaseId });
        res.json(response.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'カテゴリーデータの取得に失敗しました。' });
    }
});

app.post('/notion-request-word', async (req, res) => {
    try {
        const { word, explanation, userId } = req.body;
        const response = await notion.pages.create({
            parent: { database_id: requestDatabaseId },
            properties: {
                id: { title: [{ text: { content: userId } }] },
                word: { rich_text: [{ text: { content: word } }] },
                explanation: { rich_text: [{ text: { content: explanation } }] },
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ワードの追加に失敗しました。' });
    }
});


// タイプデータ取得API (追加)
app.get('/notion-type', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: typeDatabaseId });
        res.json(response.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'タイプデータの取得に失敗しました。' });
    }
});

const announcementDatabaseId = process.env.NOTION_ANNOUNCEMENT_MST_DATABASE_ID;

app.get('/notion-announcements', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: announcementDatabaseId });

        // Notionのレスポンスデータを整形
        const announcements = response.results.map(item => ({
            announceId: item.properties.announceId.title[0]?.text.content,
            titleName: item.properties.titleName.rich_text[0]?.text.content || "タイトルなし",
            content: item.properties.content.rich_text[0]?.text.content || "内容なし",
            created_at: item.properties.created_at.date?.start || "日付なし"
        }));

        res.json(announcements);
    } catch (error) {
        console.error("お知らせデータの取得に失敗しました", error);
        res.status(500).json({ error: 'お知らせデータの取得に失敗しました。' });
    }
});

app.post('/notion-announcement', async (req, res) => {
    try {
        const { title, content } = req.body;
        const createdAt = new Date().toISOString(); // 現在の日時を取得

        const response = await notion.pages.create({
            parent: { database_id: announcementDatabaseId },
            properties: {
                announceId: { title: [{ text: { content: new Date().getTime().toString() } }] }, // 一意のIDを生成
                titleName: { rich_text: [{ text: { content: title } }] },
                content: { rich_text: [{ text: { content: content } }] },
                created_at: { date: { start: createdAt } }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.error('お知らせの追加に失敗しました', error);
        res.status(500).json({ error: 'お知らせの追加に失敗しました。' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

