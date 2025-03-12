const express = require('express');
const { fetchDatabaseItems } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await fetchDatabaseItems(databaseIds.category);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'カテゴリーデータの取得に失敗しました。' });
    }
});

module.exports = router;
