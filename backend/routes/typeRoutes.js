const express = require('express');
const { fetchDatabaseItems } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const types = await fetchDatabaseItems(databaseIds.type);
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: 'タイプデータの取得に失敗しました。' });
    }
});

module.exports = router;
