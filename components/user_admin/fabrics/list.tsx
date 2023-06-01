import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState,useEffect } from "react"
import style from './style.module.css'

const UserAdminFabricsList = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [fabrics,setFabrics] = useState<any>([]);

    const clickItem = (kiziarai_id:string)=>{
        document.location = '/user_admin/create_fabric?id=' + kiziarai_id;
    }

    // ka_fabricsからデータを取得
    useEffect(()=>{
        (async()=>{
            let {data,error} = await supabaseClient.from('ka_fabrics').select();
            if(data){
                setFabrics(data);
            }
            if(error){
                console.log('error',error);
            }
        })();
    },[]);

    return (<>
        <div className="container">

            {fabrics.map((item:any)=>{
                return (<div className={style.row} onClick={()=>{ clickItem(item.kiziarai_id) }}>
                        <div className={style.column}>{item.texture_name_jp}</div>
                        <div className={style.column}>{item.kiziarai_id}</div>
                </div>)
            })}

        </div>
    </>)
}

export default UserAdminFabricsList