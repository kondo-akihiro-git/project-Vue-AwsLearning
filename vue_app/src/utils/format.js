
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // "APIレスポンスのデータ整形"
    //
    // wordsData, categoriesData : Notionから取得したAPIレスポンス
    // formattedData : カテゴリーと関連するワードのリストがまとまったデータ
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////  
export function formatData(wordsData, categoriesData, typesData) {
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
    
        // カテゴリーID順に並べ替え
        const sortedCategoryIds = Object.keys(formattedCategoryData).sort((a, b) => {
            return parseInt(a) - parseInt(b);  // カテゴリーIDを数値として比較してソート
        });
    
        const formattedData = {};
        wordsData.forEach(wordData => {
            const wordId = wordData.properties.id.title[0]?.text.content
            const wordName = wordData.properties.word.rich_text[0]?.text.content || "不明なワード";
            const explanation = wordData.properties.explanation.rich_text[0]?.text.content || "説明なし";
            const categoryId = wordData.properties.categoryId.rich_text[0]?.text.content;
            const categoryName = formattedCategoryData[categoryId];
            const typeId = wordData.properties.typeId.rich_text[0]?.text.content;
            const typeName = formattedTypeData[typeId] || "不明なタイプ";
            const relatedIds = wordData.properties.relatedId?.rich_text[0]?.text.content
            ? wordData.properties.relatedId.rich_text[0].text.content.split(",").map(id => id.trim())
            : [];
    
            if (!formattedData[categoryName]) {
                formattedData[categoryName] = [];
            }
            formattedData[categoryName].unshift({ wordId, wordName, explanation, typeName, relatedIds });
        });
    
        // ソートしたカテゴリー順でデータを返す
        const sortedFormattedData = {};
        sortedCategoryIds.forEach(categoryId => {
            const categoryName = formattedCategoryData[categoryId];
            sortedFormattedData[categoryName] = formattedData[categoryName];
        });
    
        return sortedFormattedData;
    }
    