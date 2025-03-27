const express = require('express');
const { fetchDatabaseItemsParallel } = require('../services/notionService');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const words = await fetchDatabaseItemsParallel();
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: 'ワードデータの取得に失敗しました。' });
    }
});

module.exports = router;
