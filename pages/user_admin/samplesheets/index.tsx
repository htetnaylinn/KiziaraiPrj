import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';
import style from './sample_sheets.module.css'
import { useState,useEffect } from 'react'

const SampleSheets = (props : any)=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [sampleSheets, setSampleSheets] = useState<any>([]);

    useEffect(()=>{
        (async()=>{
            // company_idを取得
            if(user){
                let {data:user_company,error}  = await supabaseClient.from('ka_view_company_group_user').select().eq('user_id',user.id).single();
                if(user_company){
                    // console.log('🐮user_company',user_company);
                    let {data : sample_sheet_data,error: sample_sheet_error} = await supabaseClient.from('ka_samplesheet').select().eq('company_id',user_company.company_id);
                    if(sample_sheet_data){
                        setSampleSheets(sample_sheet_data);
                    }
                    if(error){
                        console.log('error',error);
                    }
                }
            }
        })();
    },[user]);

    return (<div>
        <h1>Sample Sheets</h1>
        <div>USER ID:{user ? user.id : "-"}</div>
        <div>
            {sampleSheets.map((item:any)=>{
                return (<div className={style.row} onClick={()=>{document.location = `/user_admin/samplesheet_editor?id=${item.id}`}}>
                       <div className={style.column}>{item.id}</div>
                       <div className={style.column}>{item.sheet_name}</div>
                       <div className={style.column}>{item.url}</div>
                    </div>)
            })}
        </div>

    </div>)
}
export default SampleSheets