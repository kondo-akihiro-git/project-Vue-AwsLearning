const { notion, databaseIds } = require('../config');

// データベースのクエリを実行する関数
const fetchDatabaseItems = async (databaseId, startCursor = undefined) => {
    let allResults = [];
    let hasMore = true;

    try {
        while (hasMore) {
            const response = await notion.databases.query({
                database_id: databaseId,
                start_cursor: startCursor,
            });

            allResults = allResults.concat(response.results);
            hasMore = response.has_more;
            startCursor = response.next_cursor;
        }
        return allResults;
    } catch (error) {
        console.error(`Notionデータ取得失敗: ${error}`);
        throw new Error('データの取得に失敗しました');
    }
};

// ページ作成関数
const createPage = async (databaseId, properties) => {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties
        });
        return response;
    } catch (error) {
        console.error(`Notionページ作成失敗: ${error}`);
        throw new Error('ページの作成に失敗しました');
    }
};

module.exports = {
    fetchDatabaseItems,
    createPage
};
