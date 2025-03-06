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


app.get('/notion-word', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: wordDatabaseId });
        res.json(response.results);
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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

