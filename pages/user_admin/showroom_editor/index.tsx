import style from './style.module.css';
import ShowroomEditor from '../../../components/showroom/showroom_editor/showroom_editor';

const UserAdminShowRoomEditorPage = () => {

    /**
     * 
     * 
     
    会社名（英語登録が表示）
    プロフィール画像
    
    /
    ・企業へのお気に入りボタン
    ・サンプルシートへの遷移（オプション）
    /

    /
    ・登録画像のRecommend 
    /

    /
    ・専門：Wool, fast
    ・産地: 尾州
    ・量産背景: 在庫あり
    /
    
    ・会社名
    ・郵便番号
    ・住所
    ＊　担当者名・メールアドレス表示されない
    ＊　担当者はChatで表示
    ＊　メールは一切な
    し
    -------------------

    会社名（英語登録が表示）
    プロフィール画像
    
    /
     チャットへの誘導ボタン
    ・企業へのお気に入りボタン
    ・インスタのアイコン
    ・サンプルシートへの遷移（オプション）
    /

    /
    　スライド、画像6枚まで
    /

    /
     生地データ
     New Arrival
     Recommend
     All fabric (2行まるごと移動) (5個✖️2行)
    /


     /
    ・専門：Wool, fast
    ・産地: 尾州
    ・量産背景: 在庫あり
    /

    /
    ・会社名
    ・郵便番号
    ・住所
    /

    /
     information
    /

     */

    return (<>
        <ShowroomEditor />
    </>);
}

export default UserAdminShowRoomEditorPage;