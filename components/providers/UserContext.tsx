import { createContext, useState,useContext,use } from "react";
import { useEffect } from "react";
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";

const UserContext = createContext({})

export const useUserContext = (): any=>{
    return useContext(UserContext)
}

export const UserContextProvider = ({children} : any) => {

    const [activeGroupPoints,setActiveGroupPoints] = useState<any>(0);
    const [selectedLangId,setSelectedLangId] = useState<any>(1); // 1:ja, 2:en

    const supabaseClient = useSupabaseClient();
    const user = useUser();


    // ユーザーの言語設定を変更する
    const changeSelectedLangId = async (lang_id:number) => {  
        if(user && user.id){
            const {data,error} = await supabaseClient.from('ka_user_selected_lang').upsert({user_id:user.id,lang_id:lang_id}).select();
            if(data && data.length >0){
                setSelectedLangId(data[0].lang_id);
            }else{
                console.log('changeSelectedLangId error',error);
            }
        }
    }




    // ユーザーのactive_groupのポイントをka_group_pointsから取得する
    const reloadActiveGroupPoints = async () => {
        // ユーザーのactive_groupのポイントをka_group_pointsから取得する

        if(user && user.id){

            const {data,error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single()
            if(data){

                const {data:group_points,error:group_points_error} = await supabaseClient.from('ka_group_points').select().eq('group_id',data.active_group_id);
                if(group_points){
                    console.log('group_points',group_points);
                    // ポイントを足し合わせる
                    let total_points = 0;
                    group_points.forEach((p:any)=>{
                        total_points += p.points;
                    })
                    console.log('total_points',total_points);

                    setActiveGroupPoints(total_points);



                }else{
                    console.log('group_points_error',group_points_error);
                }
            }
        }
    }

    useEffect(()=>{
        (async ()=>{
            console.log('User Provider');
            if(user && user.id){
                const {data,error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single()
                if(data){
                    // ユーザーのactive_groupのポイントをka_group_pointsから取得する
                    reloadActiveGroupPoints();

                }else{
                    // 初回ログイン。ユーザーを登録する
                    let hostname = location.protocol + '//' + location.host;
                    await axios.post(hostname + '/api/user_profile/create')
                    .then((d)=>{
                        alert('add user profile')

                    }).catch((error)=>{
                        alert('NG: failed adding user profile')
                    });

                }

                const {data:lang,error:lang_error} = await supabaseClient.from('ka_user_selected_lang').select().eq('user_id',user.id).single();
                if(lang && lang.lang_id > 0){
                    setSelectedLangId(lang.lang_id);
                }else
                {
                    // ユーザーの言語設定がない場合は、デフォルトの言語を設定する
                    // 1:ja, 2:en, 3:zh
                    // supabaseのka_user_selected_langに登録する
                    const {data:insert_lang,error:insert_lang_error} = await supabaseClient.from('ka_user_selected_lang').insert([{user_id:user.id,lang_id:1}]);
                    if(insert_lang){
                        console.log('insert_lang',insert_lang);
                    }else{
                        console.log('insert_lang_error',insert_lang_error);
                    }

                    
                    setSelectedLangId(1);
                }

            }
        })();
    },[user])

    const value ={
        activeGroupPoints, // ユーザーのactive_groupのポイント
        reloadActiveGroupPoints, // ポイントを再読み込みする
        selectedLangId, // ユーザーの選択言語
        changeSelectedLangId, // ユーザーの選択言語を変更する
    }

    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}
