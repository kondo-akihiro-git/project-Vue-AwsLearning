    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 新規ワードの追加時バリデーション
    //
    //////////////////////////////////////////////////////////////////////////////////////////////////// 

const defaultWord = 'サンプルワード';
const defaultExplanation = 'サンプルの説明文です。';
const defaultUserId = '123';

export function validateWord(word) {
    if (!word) return "ワード名は必須です。";
    if (word.length > 100) return "ワード名は100文字以内で入力してください。";
    return "";
}

export function validateExplanation(explanation) {
    if (!explanation) return "説明は必須です。";
    if (explanation.length < 10) return "説明は10文字以上で入力してください。";
    if (explanation.length > 300) return "説明は300文字以内で入力してください。";
    return "";
}

export function validateUserId(userId) {
    if (!userId) return "ユーザーIDは必須です。";
    if (!/^\d{3}$/.test(userId)) return "ユーザーIDは3桁の数値で入力してください。";
    return "";
}

export function validateDefaultValues(word, explanation, userId) {
    const defaultList = [];
    if (word === defaultWord) defaultList.push("ワード名欄");
    if (explanation === defaultExplanation) defaultList.push("説明欄");
    if (userId === defaultUserId) defaultList.push("ユーザーID欄");

    return defaultList.length > 0
        ? `${defaultList.join('、')} の具体例を変更後、追加ボタンを押してください。`
        : "";
}

export const defaultValues = {
    word: defaultWord,
    explanation: defaultExplanation,
    userId: defaultUserId
};
