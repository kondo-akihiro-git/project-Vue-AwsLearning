require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const config = {
    notion,
    databaseIds: {
        word: process.env.NOTION_WORD_MST_DATABASE_ID,
        category: process.env.NOTION_CATEGORY_MST_DATABASE_ID,
        request: process.env.NOTION_REQUEST_MST_DATABASE_ID,
        type: process.env.NOTION_TYPE_MST_DATABASE_ID,
        announcement: process.env.NOTION_ANNOUNCEMENT_MST_DATABASE_ID,
        user: process.env.NOTION_USER_MST_DATABASE_ID,
        modification: process.env.NOTION_MODIFICATION_MST_DATABASE_ID,
    }
};

module.exports = config;
