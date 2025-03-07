import axios from 'axios';
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
    // Notionデータ更新
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
    // "APIレスポンスのデータ整形"
    //
    // wordsData, categoriesData : Notionから取得したAPIレスポンス
    // formattedData : カテゴリーと関連するワードのリストがまとまったデータ
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////  
function formatData(wordsData, categoriesData, typesData) {
    const formattedCategoryData = {};
    categoriesData.forEach(categoryData => {
        const categoryId = categoryData.properties.id.title[0]?.text.content;
        const categoryName = categoryData.properties.category.rich_text[0]?.text.content || "未分類";
        formattedCategoryData[categoryId] = categoryName;
    });

    const formattedTypeData = {};
    typesData.forEach(typeData => {
        const typeId = typeData.properties.id.title[0]?.text.content;
        const typeName = typeData.properties.type.rich_text[0]?.text.content || "不明なタイプ";
        formattedTypeData[typeId] = typeName;
    });

    const formattedData = {};
    wordsData.forEach(wordData => {
        const wordName = wordData.properties.word.rich_text[0]?.text.content || "不明なワード";
        const explanation = wordData.properties.explanation.rich_text[0]?.text.content || "説明なし";
        const categoryId = wordData.properties.categoryId.rich_text[0]?.text.content;
        const categoryName = formattedCategoryData[categoryId];
        const typeId = wordData.properties.typeId.rich_text[0]?.text.content;
        const typeName = formattedTypeData[typeId] || "不明なタイプ";

        if (!formattedData[categoryName]) {
            formattedData[categoryName] = [];
        }
        formattedData[categoryName].push({ wordName, explanation, typeName });
    });

    return formattedData;
}
