import axios from 'axios';

export async function loginUser(username, password) {
    try {
        // Notion APIからデータを取得
        const response = await axios.get('http://localhost:3000/notion-auth');
        console.log(response)

        // レスポンスのデータが配列で返ってくることを確認
        const users = response.data;

        console.log(users)

        // ユーザー情報のチェック
        const user = users.find(user => {
            const userName = user.properties.name.rich_text[0]?.text.content;
            const userPassword = user.properties.password.rich_text[0]?.text.content;
            const adminFlg = user.properties.adminFlg.rich_text[0]?.text.content === 'true';

            // ユーザー名、パスワード、adminFlgが全て一致しているかをチェック
            return userName === username && userPassword === password && adminFlg;
        });

        if (user) {
            // ユーザーが認証されている場合
            localStorage.setItem('user', JSON.stringify(user)); // ログイン情報をローカルストレージに保存
            return true;
        } else {
            return false; // 認証失敗
        }
    } catch (error) {
        console.error('認証エラー:', error);
        return false;
    }
}
