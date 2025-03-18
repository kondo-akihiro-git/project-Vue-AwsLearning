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

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 既存ワード修正時のバリデーション
//
////////////////////////////////////////////////////////////////////////////////////////////////////

const defaultModifiedWord = '修正サンプルワード';
const defaultModifiedExplanation = '修正サンプルの説明文です。';

export function validateModifiedWord(word) {
    if (!word) return "修正後のワード名は必須です。";
    if (word.length > 100) return "修正後のワード名は100文字以内で入力してください。";
    return "";
}

export function validateModifiedExplanation(explanation) {
    if (!explanation) return "修正後の説明は必須です。";
    if (explanation.length < 10) return "修正後の説明は10文字以上で入力してください。";
    if (explanation.length > 300) return "修正後の説明は300文字以内で入力してください。";
    return "";
}

export function validateSelectedWord(selectedWordId) {
    if (!selectedWordId) return "修正対象のワードを選択してください。";
    return "";
}

export function validateModifiedDefaultValues(word, explanation) {
    const defaultList = [];
    if (word === defaultModifiedWord) defaultList.push("ワード名欄");
    if (explanation === defaultModifiedExplanation) defaultList.push("説明欄");

    return defaultList.length > 0
        ? `${defaultList.join('、')} の具体例を変更後、送信ボタンを押してください。`
        : "";
}

export const defaultModifiedValues = {
    word: defaultModifiedWord,
    explanation: defaultModifiedExplanation
};
