import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect,useState } from "react";
import cstyle from '../../../components/css/style.module.css';
import Link from "next/link";
import UserProfileSimpleDisplay from "../../../components/user_profile/simple_display";

const UserAdminSupplierTop = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();



    /*
        ユーザーの招待フロー
        Supplier/Topの グループメンバー一覧から、add a new memberで登録する
        招待を受けたユーザーは、
     
     */


    return (<>
        <h1>Supplier Top Menu</h1>
        <UserProfileSimpleDisplay />
        <div>ka_group_member_waitinglistのselectのRLS、現状のデータでselect確認する。 insertから連続でselectがだめなだけかも</div>
        <Link href="/user_plans/"><div className={cstyle.btn}>プラン選択</div></Link>
        <div className={cstyle.btn}>-解約申請</div>
        <Link href="/user_admin/bankaccount"><div className={cstyle.btn}>振り込み先の銀行口座登録</div></Link>
        <div>ユーザープロフィール登録内に、招待を受ける機能</div>
        <Link href="/user_admin/account/"><div className={cstyle.btn}>ユーザープロフィールの登録</div></Link>
        <Link href="/user_admin/company_info/"><div className={cstyle.btn}>会社概要</div></Link>
        <Link href="/user_admin/supplier/"><div className={cstyle.btn}>-表示設定</div></Link>
        <Link href="/user_admin/create_fabric"><div className={cstyle.btn}>生地登録</div></Link>
        <Link href="/user_admin/samplesheets"><div className={cstyle.btn}>サンプルシート管理</div></Link>
        <Link href="/user_admin/showroom_editor"><div className={cstyle.btn}>Showroom管理</div></Link>
        <Link href="/ka_dev/payment_test"><div className={cstyle.btn}>支払いリンクの依頼フォーム</div></Link>
        <Link href="/user_admin/request_payment_links"><div className={cstyle.btn}>支払いリンクの依頼一覧</div></Link>
        <Link href="/user_admin/sales"><div className={cstyle.btn}>売上管理</div></Link>
        <Link href="/user_admin/favs"><div className={cstyle.btn}>お気に入りユーザー管理</div></Link>
        <Link href="/user_admin/get_points"><div className={cstyle.btn}>ポイント購入</div></Link>
        <Link href="/user_admin/group"><div className={cstyle.btn}>グループメンバー一覧</div></Link>
        <div className={cstyle.btn}>-グループメンバーの管理</div>

        <div>PV数の取得は、fabrics/itemのuseEffectに実装している</div>
        

        <div className={cstyle.btn}>-生地登録メモ</div>
        <div className={cstyle.btn}>-PDFダウンロード</div>
        <div className={cstyle.btn}>-キーワード</div>
        <div className={cstyle.btn}>-インポート</div>
    </>);
}

export default UserAdminSupplierTop