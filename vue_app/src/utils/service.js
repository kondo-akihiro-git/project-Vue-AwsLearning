import axios from 'axios';
import { formatData } from './format';
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Notionデータ取得
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
export async function fetchData() {
    try {
        const wordResponse = await axios.get('http://localhost:3000/notion-word');
        const categoryResponse = await axios.get('http://localhost:3000/notion-category');
        const typeResponse = await axios.get('http://localhost:3000/notion-type');

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
    //////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function submitRequest(word, explanation, userId) {
    try {
        await axios.post('http://localhost:3000/notion-request-word', {
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
    //////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function fetchAnnouncements() {
    try {
        const response = await axios.get('http://localhost:3000/notion-announcement');
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
    //////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function submitAnnouncement(title, content) {
    try {
        await axios.post('http://localhost:3000/notion-announcement', {
            title,
            content
        });
        alert('お知らせが登録されました');
    } catch (error) {
        console.error('お知らせの登録に失敗しました', error);
    }
}
