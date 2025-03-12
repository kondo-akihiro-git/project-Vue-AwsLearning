const express = require('express');
const { fetchDatabaseItems, createPage } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await fetchDatabaseItems(databaseIds.announcement);
        // Notionのレスポンスデータを整形
        const announcements = response.map(item => ({
            announceId: item.properties.announceId.title[0]?.text.content,
            titleName: item.properties.titleName.rich_text[0]?.text.content || "タイトルなし",
            content: item.properties.content.rich_text[0]?.text.content || "内容なし",
            created_at: item.properties.created_at.date?.start || "日付なし"
        }));

        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'お知らせデータの取得に失敗しました。' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const createdAt = new Date().toISOString();
        const idByCurrentTime = new Date().getTime().toString();

        const properties = {
            announceId: { title: [{ text: { content: idByCurrentTime } }] },
            titleName: { rich_text: [{ text: { content: title } }] },
            content: { rich_text: [{ text: { content: content } }] },
            created_at: { date: { start: createdAt } }
        };

        const response = await createPage(databaseIds.announcement, properties);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'お知らせの追加に失敗しました。' });
    }
});

module.exports = router;
