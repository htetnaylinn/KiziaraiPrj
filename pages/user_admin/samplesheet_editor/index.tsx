import style from './samplesheet_editor.module.css'

import Router,{useRouter} from 'next/router';


import { useEffect,useState,useRef } from 'react'
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";

const SamplesheetEditor = ()=>{

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const [fabrics,setFabrics] = useState<any[]>([]);
    const [showConfimation,setShowConfirmation] = useState(true);

    const router = useRouter();

    // company_id,開始日、終了日、サンプルシート名
    const companyIdRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const samplesheetNameRef = useRef<HTMLInputElement>(null);

    // 生成したURLのstate
    const [url,setUrl] = useState("");

    // サンプルシートにひもづいた生地の一覧
    const [samplesheetFabrics,setSamplesheetFabrics] = useState<any[]>([]);

    // ランダムなアルファベットと数字からなる８文字の文字列_companyId の文字列を生成し、URLにセットする
    const createUrl = ()=>{
        let randomString = Math.random().toString(36).slice(-8);
        let url = randomString  + companyIdRef.current?.value;
        return url;
    }

    // 各refからデータを取得し、サンプルシートを作成、ka_samplesheetにinsertする
    const createSamplesheet = async ()=>{

        alert('c');
        if(startDateRef.current && endDateRef.current){
            let company_id = companyIdRef.current?.value;
            //      <input type="date">の値は、2021-08-01のような文字列になる。これをtoISOString()で変換する
            let start_date = new Date(startDateRef.current?.value).toISOString();
            let end_date   = new Date(endDateRef.current?.value).toISOString();
            let samplesheet_name = samplesheetNameRef.current?.value;
            let tmp_url = createUrl();
    
            let {data,error} = await supabaseClient.from('ka_samplesheet').insert({
                company_id:company_id,
                start_date:start_date,
                end_date:end_date,
                sheet_name:samplesheet_name,
                url:tmp_url
            }).select();

            if(data){
                alert('ok');
                console.log('success',data);
            }
            if(error){

                alert('error');
                console.log('error',error);
            }
        }else{
            alert('date is not set');
        }
       
    }

    // ka_samplesheet_fabricsに、記事を追加する
    const addFabricToSampleSheet =  async (fabric_id : any)=>{

        if(fabric_id && companyIdRef.current){
            let samplesheet_id = router.query.id;
            let {data,error} = await supabaseClient.from('ka_samplesheet_fabrics').insert({
                samplesheet_id:samplesheet_id,
                fabric_id:fabric_id,
                company_id:companyIdRef.current?.value,
                sort_no:1
            });

            console.log(data,error);

            await reloadSampleSheetFabrics();
        }
    }

    // reload samplesheet fabrics
    const reloadSampleSheetFabrics = async ()=>{
        let samplesheet_id = router.query.id;
        let {data,error} = await supabaseClient.from('ka_samplesheet_fabrics').select().eq('samplesheet_id',samplesheet_id).select();
        if(data){
            setSamplesheetFabrics(data);
        }
    }

    useEffect(()=>{
        if(user){
            // company_idを取得
            (async ()=>{
                let {data,error} = await supabaseClient.from('ka_view_company_group_user').select().eq('user_id',user.id).single();
                if(data){
                    let company_id = data.company_id;
                    if(companyIdRef.current){
                        companyIdRef.current.value = company_id;
                    }
                    // ka_fabricsからデータを取得
                    let {data : fabrics_data,error: fabrics_error} = await supabaseClient.from('ka_fabrics').select().eq('company_id',company_id);
                    if(fabrics_data){
                        setFabrics(fabrics_data);
                    }
                    if(fabrics_error){
                        console.log('error',fabrics_error);
                    }
                    await reloadSampleSheetFabrics();
                }

                if(error){
                    console.log('error',error);
                }
            })();
        }
       // let list = ["","","","","",""];
       // setFabrics(list);
    },[user]);

    // routerのクエリが　router.query.idのとき、サンプルシートを取得する
    useEffect(()=>{
        let id = router.query.id;
        if(id){
            (async ()=>{
                let {data,error} = await supabaseClient.from('ka_samplesheet').select().eq('id',id).single();
                if(data){
                    console.log('data',data);
                    let samplesheet = data;
                    if(companyIdRef.current){
                        companyIdRef.current.value = samplesheet.company_id;
                    }
                   
                    if(startDateRef.current){
                        // 日付を yyyy-mm-ddの形式に変換する
                        let start_date = new Date(samplesheet.start_date).toISOString().slice(0,10);
                        startDateRef.current.value = start_date;
                    }
                    
                    if(endDateRef.current){
                        let end_date = new Date(samplesheet.end_date).toISOString().slice(0,10);
                        endDateRef.current.value = end_date;
                    }
                    if(samplesheetNameRef.current){
                        samplesheetNameRef.current.value = samplesheet.sheet_name;
                    }

                    if(samplesheet.url){
                       setUrl(samplesheet.url);
                    }
                }
                if(error){
                    console.log('error',error);
                }

                await reloadSampleSheetFabrics(); 
            })();
        }
    },[router.query]);


    return (<div className={style.container}>

        <div className={style.center_container}>
            <div className={style.left_container}>
                <h1>Sample Sheet Editor</h1>
                <div>{user?.email}</div>

                <div>Sample Sheet Form</div>
                <div className={style.row}>
                    <div>Company ID</div>
                    <input type="text" ref={companyIdRef} />
                </div>
                <div className={style.row}>
                    <div>Start Date</div>
                    <input type="date" ref={startDateRef} /> 
                </div>
                <div className={style.row}>
                    <div>End Date</div>
                    <input type="date" ref={endDateRef} />
                </div>
                <div className={style.row}>
                    <div>Sample Sheet Name</div>
                    <input type="text" ref={samplesheetNameRef} />
                </div>
                <div className={style.row}>
                    <h3>URL</h3>
                    <div>{url}</div>
                </div>
            
                <div>
                    <button onClick={createSamplesheet}>Create Sample Sheet</button>
                </div>
                

                <div> SampleSheet Fabrics</div>

                {samplesheetFabrics.map((d)=>{
                    return (<div className={style.row_related_fabric}>⭐️
                        <p>{d.id}</p>
                        <p>{d.fabric_id}</p>
                        <p>{d.sort_no}</p>
                    </div>)
                    })
                }
            </div>
            <div className={style.right_container}>
                <div>fabrics list</div>
                {fabrics.map((d)=>{
                    /* クリックした時に、fabricのidをセット */
                    return (<div className={style.row_fabric} onClick={()=>{addFabricToSampleSheet(d.id)}}>
                        <p>{d.id}</p>
                        <p>{d.kiziarai_id}</p>
                        <p>{d.texture_name_jp}</p>
                    </div>)
                })}
            </div>
        </div>
    </div>)
}

export default SamplesheetEditor