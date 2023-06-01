import { useEffect,useState } from "react";
import {useUser,useSupabaseClient} from '@supabase/auth-helpers-react';
import Link from "next/link";
import UserProfileSimpleDisplay from "../../../components/user_profile/simple_display";

const TestSampleSheetsPage = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [sampleSheet,setSampleSheet] = useState<any[]>([]);

    //ka_samplesheetから一覧を取得
    useEffect(()=>{
        if(user){
            (async ()=>{
                let {data,error} = await supabaseClient.from('ka_samplesheet').select();
                if(data){
                    console.log('data',data);
                    setSampleSheet(data);
                }
                if(error){
                    console.log('error',error);
                }
            })();
        }
    });

    return (<>
        <div>TestSampleSheetsPage</div>
        <UserProfileSimpleDisplay />
        {sampleSheet.map((d)=>{
            return (<div key={d.id}><Link href={`/samplesheet/${d.id}`}>{d.sheet_name}</Link></div>)
        })}
        </>);
}
export default TestSampleSheetsPage;