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

// データベースのクエリを並列で実行する関数
const fetchDatabaseItemsParallel = async () => {
    try {
        const db1Promise = fetchDatabaseItems(databaseIds.word_mst_1);
        const db2Promise = fetchDatabaseItems(databaseIds.word_mst_2);
        const db3Promise = fetchDatabaseItems(databaseIds.word_mst_3);

        const [db1Data, db2Data, db3Data] = await Promise.all([
            db1Promise,
            db2Promise,
            db3Promise
        ]);

        // データを結合してID順にソートして返す
        const allResults = [...db1Data, ...db2Data, ...db3Data];

        // IDでソート (IDは title[0]?.text.content で取得)
        allResults.sort((a, b) => {
            const idA = parseInt(a.properties.id.title[0]?.text.content || "0", 10);
            const idB = parseInt(b.properties.id.title[0]?.text.content || "0", 10);
            return idA - idB;
        });

        return allResults;
    } catch (error) {
        console.error(`並列リクエスト失敗: ${error}`);
        throw new Error('並列リクエストの実行に失敗しました');
    }
};


module.exports = {
    fetchDatabaseItems,
    createPage,
    fetchDatabaseItemsParallel
};
