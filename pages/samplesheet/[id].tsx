import style from './samplesheet.module.css';
import { useState,useEffect } from 'react';
import Router,{useRouter} from 'next/router';
import SamplesheetItem from '../../components/samplesheet_item/samplesheet_item';
import SamplesheetItemConfirmation from '../../components/samplesheet_item_confirmation/samplesheet_item_confirmation';
import SamplesheetHeader from '../../components/samplesheet_header/samplesheet_header';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';

const Samplesheet = ()=>{

    const [fabrics,setFabrics] = useState<any[]>([]);
    const [showConfimation,setShowConfirmation] = useState(false);

    const [companyProfile,setCompanyProfile] = useState<any>(null);
    const [sampleSheet,setSampleSheet] = useState<any>(null);

    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    useEffect(()=>{

        if(user && router.query.id){
      
            (async ()=>{

                //  ka_samplesheetからデータを取得し、company_idで、ka_company_profileのデータをひっぱる
                let {data : samplesheet_data,error : samplesheet_error} = await supabaseClient.from('ka_samplesheet').select().eq('id',router.query.id).single();
                if(samplesheet_data){
                    setSampleSheet(samplesheet_data);
                    let {data : company_data,error : company_error} = await supabaseClient.from('ka_company_profile').select().eq('id',samplesheet_data.company_id).single();
                    if(company_data){
                        setCompanyProfile(company_data);
                    }
                }

                //ka_samplesheet_fabricsからデータを取得
                let {data,error} = await supabaseClient.from('ka_samplesheet_fabrics').select().eq('samplesheet_id',router.query.id);
                if(data){

                    // data.fabric_idを元にka_fabricsからデータを取得
                    let {data : fabric_data,error : fabric_error} = await supabaseClient.from('ka_fabrics').select().in('id',data.map((d:any)=>{return d.fabric_id}));
                    if(fabric_data){
                        console.log('👑',fabric_data);
                        setFabrics(fabric_data);
                    }
                }

                if(error){
                    console.log('error',error);
                }

            })();
        }     
    },[user,router.query]);

    return (
    <div className={style.container}>
        <SamplesheetHeader company_name={companyProfile ? companyProfile.company_name: ""} event_name={sampleSheet ? sampleSheet.sheet_name : ""} />
         {showConfimation ? 
            <SamplesheetItemConfirmation />    
        : 
            <div className={style.container}>
                {fabrics.map((d)=>{
                    return <SamplesheetItem fabric={d} samplesheetId={router.query.id} />
                })}
                <div className={style.ok_btn}>確定</div>
            </div>
        }
    </div>);
}
export default Samplesheet;