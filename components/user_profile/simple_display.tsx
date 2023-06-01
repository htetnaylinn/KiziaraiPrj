import { useEffect,useState } from "react";
import { getRoleName,getRolePlanName,getLanguageText } from "../commons/commons";
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserContext } from "../providers/UserContext";
import style from './style.module.css';


const UserProfileSimpleDisplay = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [roleName,setRoleName] = useState<string>('');
    const [rolePlanName,setRolePlanName] = useState<string>('');

    const {selectedLangId,activeGroupPoints} = useUserContext();

    useEffect(()=>{
        (async ()=>{
            if(user){
                // ka_view_user_permissionからデータを取得
                let {data,error} = await supabaseClient.from('ka_view_user_permissions').select().eq('user_id',user.id);
                if(data){
                    for(let i=0;i<data.length;i++){
                        console.log('🐮data[i]',data[i]);
                        let role_name = getRoleName(data[i].role_id);
                        let role_plan_name = getRolePlanName(data[i].plan_id);
                        setRoleName(role_name);
                        setRolePlanName(role_plan_name);
                    }
                }
            }
        })();
    },[user]);


    return (
        <div className={style.flex_container}>
            <div className={style.column}>UID:{user ? user.id : "-"}</div>
            <div className={style.column}>EMAIL:{user ? user.email : "-"}</div>
            <div className={style.column}>POINTS:{activeGroupPoints}</div>
            <div className={style.column}>Role:{roleName}</div>
            <div className={style.column}>Plan:{rolePlanName}</div>
            <div className={style.column}>LANG:{getLanguageText(selectedLangId)}</div>
        </div>
    )
}
export default UserProfileSimpleDisplay;