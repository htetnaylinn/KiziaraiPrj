
import style from "../../components/css/style.module.css";
import UserProfileSimpleDisplay from "../../components/user_profile/simple_display";
import Link from "next/link";

const KaList = ()=>{

    return (<>

        <UserProfileSimpleDisplay />
                    <div className={style.one_line_container}>
                        <div>- Showroomの表示完成させる</div>
                        <div>- テストとテスト一覧</div>
                    </div>

                    <div className={style.one_line_container}>
                        <p className={style.btn}><a href="/sign_up/">ユーザー登録 Sign Up</a></p>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/sign_in/">ログイン Sign In</a></div>   
                    </div>
                    
                       
                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_plans/">プランの申し込み</a></div>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/company_info/">会社の登録</a></div>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/fabrics">生地の一覧</a></div>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/create_fabric">生地の登録</a></div>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/samplesheets">サンプルシートの一覧</a></div>
                    </div>
                    
                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/samplesheet_editor">サンプルシートの登録</a></div>
                    </div>
                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/ka_dev/payment_test/">チャット決済のテスト</a></div>
                    </div>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/user_admin/request_payment_links">決済リンクリクエスト一覧</a></div>
                    </div>
                    
                    <Link href="/user_plans/"><div className={style.btn}>プラン選択</div></Link>
                    <div className={style.btn}>-解約申請</div>
                    <Link href="/user_admin/bankaccount"><div className={style.btn}>振り込み先の銀行口座登録</div></Link>
                    <div>ユーザープロフィール登録内に、招待を受ける機能</div>
                    <Link href="/user_admin/account/"><div className={style.btn}>ユーザープロフィールの登録</div></Link>
                    <Link href="/user_admin/company_info/"><div className={style.btn}>会社概要</div></Link>
                    <Link href="/user_admin/supplier/"><div className={style.btn}>-表示設定</div></Link>
                    <Link href="/user_admin/create_fabric"><div className={style.btn}>生地登録</div></Link>
                    <Link href="/user_admin/samplesheets"><div className={style.btn}>サンプルシート管理</div></Link>
                    <Link href="/user_admin/showroom_editor"><div className={style.btn}>Showroom管理</div></Link>
                    <Link href="/ka_dev/payment_test"><div className={style.btn}>支払いリンクの依頼フォーム</div></Link>
                    <Link href="/user_admin/request_payment_links"><div className={style.btn}>支払いリンクの依頼一覧</div></Link>
                    <Link href="/user_admin/sales"><div className={style.btn}>売上管理</div></Link>
                    <Link href="/user_admin/favs"><div className={style.btn}>お気に入りユーザー管理</div></Link>
                    <Link href="/user_admin/get_points"><div className={style.btn}>ポイント購入</div></Link>
                    <Link href="/user_admin/group"><div className={style.btn}>グループメンバー一覧</div></Link>

                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/test/samplesheets/">【テスト用】すべてのサンプルシート一覧</a></div>   
                    </div>
                    
                    <div className={style.one_line_container}>
                        <div className={style.btn}><a href="/ka_admin/team/">【管理】ユーザーチーム情報確認や削除</a></div>   
                    </div>
                       
    </>)
}

export default KaList;