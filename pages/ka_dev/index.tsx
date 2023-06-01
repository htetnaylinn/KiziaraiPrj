import style from '../../components/css/style.module.css'
import axios from 'axios'
import { useUserContext } from '../../components/providers/UserContext'
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import UserProfileSimpleDisplay from '../../components/user_profile/simple_display'

import { useLocaleText } from '../../components/hooks/use_locale_text'
import LangToggle from '../../components/lang_toggle/lang_toggle'

const KADev = () => {

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const {getText} = useLocaleText();


    // UserProviderのuseUserContextから、activeGroupPointsを取得する
    const {activeGroupPoints,reloadActiveGroupPoints,selectedLangId} = useUserContext();

    // ポイントの取得
    // /api/group_points/get_points
    const getPointTest = async ()=>{
        axios.post("/api/group_points/get_points").then((d)=>{
            alert('ok');
            console.log('取得ok',d);
        }).catch((error)=>{
            alert('ng');
            console.log('取得ng',error);
        });
    }

    // 商品IDとポイント情報はテーブルに必要
    // ポイントの消費
    const consumePointTest = async ()=>{
        axios.post("/api/group_points/consume_points").then((d)=>{
            alert('ok');
            console.log('取得ok',d);
        }).catch((error)=>{
            alert('ng');
            console.log('取得ng',error);
        });
    }

    useEffect(()=>{
        (async ()=>{
            if(user){
                reloadActiveGroupPoints();  
            }
        })
    },[user]);

    return (<div className={style.all_container}>
                <div className={style.flex_container}>
                <div className={style.flex_item_w1200}>
                        <div className={style.one_line_container}>
                           <UserProfileSimpleDisplay />
                        </div>
                        
                        <div className={style.one_line_container}>
                            <LangToggle />
                        </div>

                        <div className={style.one_line_container}>
                            Groupのポイント:{activeGroupPoints}
                        </div>
            
                        <p>言語(Home):{getText("Home")}</p>

                        <div className={style.one_line_container}>
                            <p className={style.btn}><a href="/sign_up/">ユーザー登録 Sign Up</a></p>
                        </div>
                        <div className={style.one_line_container}>
                            <div className={style.btn}><a href="/sign_in/">ログイン Sign In</a></div>   
                        </div>
                        <p>初回ログイン時に、user_profileに、登録を行う。*supabaseで、トリガーの機能は存在するが、Alpha版のままなので使っていない。<br/>
                        ka_user_profile, ka_user_group, ka_user_group_admin, ka_user_group_membersが更新対象。<br/>
                        ProviderのUserContextで、user_profileの登録がなければ、/api/user_profile/create で登録する</p>

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

                   

                        <div className={style.one_line_container}>
                            <div className={style.btn}><a href="/user_admin/supplier/top">【ユーザー】サプライヤーのトップ</a></div>
                        </div>

                        <div className={style.one_line_container}>
                            <div className={style.btn}><a href="/test/samplesheets/">【テスト用】すべてのサンプルシート一覧</a></div>   
                        </div>
                       
                        <div className={style.one_line_container}>
                            <div className={style.btn}><a href="/ka_admin/team/">【管理】ユーザーチーム情報確認や削除</a></div>   
                        </div>
                        <div className={style.one_line_container}>
                            <div className={style.btn} onClick={getPointTest}>【管理】ポイントの取得</div>
                        </div>
                        <div className={style.one_line_container}>
                            <div className={style.btn} onClick={consumePointTest}>【管理】ポイントの消費</div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default KADev