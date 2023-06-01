import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect,useState } from "react";
import style from './style.module.css'

const BookmarkSampleSheet = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [bookmarks,setBookmarks] = useState<any[]>([]);

    useEffect(()=>{

        if(user){
            
            // サンプルシートのブックマークを取得する
            (async ()=>{
                const {data,error} = await supabaseClient.from('ka_samplesheet_users_feedback').select().eq('user_id',user.id);
                console.log('a',data,user);

                if(data){
                    setBookmarks(data);
                }

                if(error){
                    console.log(error);

                }
            })();
        }
    },[user]);

    return (<div>
        <div>Sample Sheet Fav</div>
        {bookmarks.map((d)=>{
            return (<div className={style.row}>samplesheet_id: {d.samplesheet_id } FABRIC ID:{d.fabric_id}</div>)
        })}
    </div>)
}

export default BookmarkSampleSheet