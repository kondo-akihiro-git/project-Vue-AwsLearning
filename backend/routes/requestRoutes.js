const express = require('express');
const { createPage } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { word, explanation, userId } = req.body;

        const properties = {
            id: { title: [{ text: { content: userId } }] },
            word: { rich_text: [{ text: { content: word } }] },
            explanation: { rich_text: [{ text: { content: explanation } }] },
        };

        const response = await createPage(databaseIds.request, properties);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'ワードの追加に失敗しました。' });
    }
});

module.exports = router;
