const express = require('express');
const { fetchDatabaseItems } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await fetchDatabaseItems(databaseIds.user);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'ユーザーデータの取得に失敗しました。' });
    }
});

module.exports = router;
