require('dotenv').config();
const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const wordsDatabaseId = process.env.NOTION_WORDS_MST_DATABASE_ID;
const groupsDatabaseId = process.env.NOTION_GROUPS_MST_DATABASE_ID;

app.get('/notion-words', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: wordsDatabaseId });
        res.json(response.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Notion words data' });
    }
});

app.get('/notion-groups', async (req, res) => {
    try {
        const response = await notion.databases.query({ database_id: groupsDatabaseId });
        res.json(response.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Notion groups data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
