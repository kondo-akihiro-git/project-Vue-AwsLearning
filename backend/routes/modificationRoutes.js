const express = require('express');
const { createPage, fetchDatabaseItems } = require('../services/notionService');
const { databaseIds } = require('../config');

const router = express.Router();

/**
 * 既存ワードの修正を送信 (POST /modification)
 */
router.post('/', async (req, res) => {
    try {
        
        const { wordId, word, explanation } = req.body;

        const idByCurrentTime = new Date().getTime().toString();
        const properties = {
            id: { title: [{ text: { content: idByCurrentTime } }] },
            wordId: { rich_text: [{ text: { content: wordId } }] }, 
            FixedWord: { rich_text: [{ text: { content: word } }] },
            FixedExplanation: { rich_text: [{ text: { content: explanation } }] }
        };

        const response = await createPage(databaseIds.modification, properties);
        res.status(200).json(response);
    } catch (error) {
        console.error('修正の送信に失敗しました', error);
        res.status(500).json({ error: '修正の送信に失敗しました。' });
    }
});

router.get('/', async (req, res) => {
    try {
        
        const words = await fetchDatabaseItems(databaseIds.modification);
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: '修正ワードデータの取得に失敗しました。' });
    }
});

module.exports = router;