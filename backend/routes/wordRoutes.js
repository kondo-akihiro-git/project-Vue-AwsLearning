const express = require('express');
const { fetchDatabaseItems } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const words = await fetchDatabaseItems(databaseIds.word);
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: 'ワードデータの取得に失敗しました。' });
    }
});

module.exports = router;
