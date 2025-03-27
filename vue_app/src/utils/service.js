import axios from 'axios';
import { formatData } from './format';

// ベースURLを環境変数から取得
const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000';
////////////////////////////////////////////////////////////////////////////////////////////////////
//
 // Notionデータ取得
//
////////////////////////////////////////////////////////////////////////////////////////////////////   
export async function fetchData() {
    try {
        const wordResponse = await axios.get(`${SERVER_URL}/notion-word-pararel`);
        // const wordResponse = await axios.get(`${SERVER_URL}/notion-word`);
        const categoryResponse = await axios.get(`${SERVER_URL}/notion-category`);
        const typeResponse = await axios.get(`${SERVER_URL}/notion-type`);

        return formatData(wordResponse.data, categoryResponse.data, typeResponse.data);
    } catch (error) {
        console.error("データの取得に失敗しました", error);
        return {};
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
 // リクエストデータ更新
//
////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function submitRequest(word, explanation, userId) {
    try {
        await axios.post(`${SERVER_URL}/notion-request-word`, {
            word,
            explanation,
            userId
        });
        alert('新規ワードのリクエストが送信されました');
    } catch (error) {
        console.error('新規ワードのリクエストに失敗しました', error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
 // 周知データ取得
//
////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function fetchAnnouncements() {
    try {
        const response = await axios.get(`${SERVER_URL}/notion-announcement`);
        return response.data;
    } catch (error) {
        console.error("お知らせデータの取得に失敗しました", error);
        return [];
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
 // 周知データ更新
//
////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function submitAnnouncement(title, content) {
    try {
        await axios.post(`${SERVER_URL}/notion-announcement`, {
            title,
            content
        });
        alert('お知らせが登録されました');
    } catch (error) {
        console.error('お知らせの登録に失敗しました', error);
    }
}

export async function submitModification(wordId, word, explanation) {
    try {
        await axios.post(`${SERVER_URL}/notion-modification`, {
            wordId,
            word,
            explanation,
        });
        alert('修正ワードのリクエストが送信されました', wordId, word, explanation);
    } catch (error) {
        console.error('修正ワードのリクエストに失敗しました', error, wordId, word, explanation);
    }
}
