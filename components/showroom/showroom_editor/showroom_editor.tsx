import style from './style.module.css';
import { useEffect, useState } from 'react';
import  { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';
import cstyle from '../../../components/css/style.module.css';


const ShowroomEditor = ()=>{


    // supabase 
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    // 会社ID
    const [companyId,setCompanyId] = useState(0);

    const [topImageFile,setTopImageFile] = useState<File>();
    const [topImageFileType,setTopImageFileType] = useState("");
    const [topImageUrl,setTopImageUrl] = useState<string>();


    const [isLoadedMaster,setIsLoadedMaster] = useState(false);


    const [salesUnitMaster,setSalesUnitMaster] =  useState<any[]>([]);
    const [sellingCategoryMaster,setSellingCategoryMaster] = useState<any[]>([]);
    const [compositionMaster, setCompositionMaster]  = useState<any[]>([]);

    const [compositionIndex,setCompositionIndex] = useState(0);
    const [compositionList,setCompositionList] = useState<any[]>([{id:0,ratio_value:0.0}]);

    // スライドショー用の6つの画像
    const [slideshowImage1File,setSlideshowImage1File] = useState<File>();
    const [slideshowImage1FileType,setSlideshowImage1FileType] = useState("");
    const [slideshowImage1Url,setSlideshowImage1Url] = useState<string>();

    const [slideshowImage2File,setSlideshowImage2File] = useState<File>();
    const [slideshowImage2FileType,setSlideshowImage2FileType] = useState("");
    const [slideshowImage2Url,setSlideshowImage2Url] = useState<string>();

    const [slideshowImage3File,setSlideshowImage3File] = useState<File>();
    const [slideshowImage3FileType,setSlideshowImage3FileType] = useState("");
    const [slideshowImage3Url,setSlideshowImage3Url] = useState<string>();

    const [slideshowImage4File,setSlideshowImage4File] = useState<File>();
    const [slideshowImage4FileType,setSlideshowImage4FileType] = useState("");
    const [slideshowImage4Url,setSlideshowImage4Url] = useState<string>();

    const [slideshowImage5File,setSlideshowImage5File] = useState<File>();
    const [slideshowImage5FileType,setSlideshowImage5FileType] = useState("");
    const [slideshowImage5Url,setSlideshowImage5Url] = useState<string>();

    const [slideshowImage6File,setSlideshowImage6File] = useState<File>();
    const [slideshowImage6FileType,setSlideshowImage6FileType] = useState("");
    const [slideshowImage6Url,setSlideshowImage6Url] = useState<string>();

    /*
        ・会社名
        ・郵便番号
        ・住所
    */

    const [companyName,setCompanyName] = useState("");
    const [companyPostalCode,setCompanyPostalCode] = useState("");
    const [companyAddress,setCompanyAddress] = useState("");

    /*

        Topの写真登録 -- (public_showrooms/{comapany_id}以下に保存)
        スライド用の画像登録 -- (public_showrooms/{comapany_id}/slide_images以下に保存)

        // showroom  テーブル
        // company_id, top_img_url, created_at
        // showroom_slide_images テーブル
        // id, created_at, company_id, img_url

        ka_company_supplier_info
        (ka_sales_unit_master)
        (ka_selling_catory_master)
        (ka_composition_master)

        専門マスタ
        産地マスタ
        量産背景

    */
   
    const uploadOrRegisterData = async (e:any)=>{
       // await checkSelectedData();

       if(companyId){
            let sales_unit = document.querySelector(`input[type='radio'][name='sales_unit']:checked`);
            let sales_unit_master_no = 0;
            if(sales_unit){
                let value = sales_unit.getAttribute('id');
                for(let i=0; i< salesUnitMaster.length; i++){
                    let s_unit =  salesUnitMaster[i];
                    if("salesunit_"+String(s_unit.master_no) == value){
                        sales_unit_master_no = s_unit.master_no;
                    }
                }
            }
            console.log('selling_unit',sales_unit_master_no);

            // Selling Category Master Numbers.
            let selling_category_master_no =0;
            let selling_category_radio_btn = document.querySelector(`input[type='radio'][name='selling_category']:checked`);
            if(selling_category_radio_btn){
                let value = selling_category_radio_btn.getAttribute('id');
                for(let i=0; i< sellingCategoryMaster.length; i++){
                    let s_category = sellingCategoryMaster[i];
                    if("category_"+String(s_category.master_no) == value){
                        selling_category_master_no = s_category.master_no;
                    }
                }
            }
            console.log('selling_category_master_no',selling_category_master_no);

            // Selling Category Master Numbers.
            let target_items = [];
            let composition = document.querySelectorAll(`[name='composition']:checked`);
            if(composition){
                for(let i= 0; i < composition.length; i++){
                    let ptag = composition[i] as HTMLInputElement;
                    console.log('checkedid',ptag,ptag.value);
                    
                    
                    let target_item = compositionMaster.filter((d)=>{
                        return d.id == ptag.value;
                    })

                    target_items.push(target_item[0].id);
                }
            }
            console.log('private tag1',target_items);

            let showroom_plan_id = 1;
            // ka_company_supplier_infoに、sales_unit_master_no,selling_category_master_no,target_itemsを登録する
            let company_supplier_info = {
                company_id:companyId,
                sales_unit_id:sales_unit_master_no,
                selling_category_id:selling_category_master_no,
                speciality:target_items,
                showroom_plan_id:showroom_plan_id
            }
            console.log('company_supplier_info',company_supplier_info);

            // supabaseで、ka_company_supplier_infoに登録する
            let {data,error} = await supabaseClient.from('ka_company_supplier_info').upsert([company_supplier_info]).select();
            if(error){
                alert('error');
                console.log('error',error);
            }else{
                alert('ok');
                console.log('data',data);
            }


        }
    }

    // 画像ファイルをメモリに保存
    const onTopPageImageFileChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];

        // file形式がjpgかpngのみ許可
        if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
            alert('jpgかpngのみアップロード可能です');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            // console.log(reader.result);
            // console.log(file);
            // useStateで画像をセットする
            setTopImageFile(file);

            let file_type ='png';
            if(file.type === 'image/jpeg'){
                file_type = 'jpg';
            }

            setTopImageFileType(file_type);
            console.log(file.type);
            console.log(file.name);
            // console.log(file.type);
            // console.log(file.size);
            // console.log(file.lastModified);
        }
        reader.readAsDataURL(file);
    }
    


    // 画像のアップロード
    const uploadTopImageToStorage = async ()=>{
        if(topImageFile && topImageFileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/cover_img.${topImageFileType}`, topImageFile);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }
    }


    // SlideShowの画像をメモリに保存
    const slideShowFileImageChange = (event:any,slide_no:number)=>{

        event.preventDefault();
        const file = event.target.files[0];
    
        // file形式がjpgかpngのみ許可
        if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
            alert('jpgかpngのみアップロード可能です');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            // console.log(reader.result);
            // console.log(file);
            // useStateで画像をセットする
    

            let file_type ='png';
            if(file.type === 'image/jpeg'){
                file_type = 'jpg';
            }

            if(slide_no === 1){
                setSlideshowImage1File(file);
                setSlideshowImage1FileType(file_type);
            }else if(slide_no === 2){
                setSlideshowImage2File(file);
                setSlideshowImage2FileType(file_type);
            }else if(slide_no === 3){
                setSlideshowImage3File(file);
                setSlideshowImage3FileType(file_type);
            }else if(slide_no === 4){
                setSlideshowImage4File(file);
                setSlideshowImage4FileType(file_type);
            }else if(slide_no === 5){
                setSlideshowImage5File(file);
                setSlideshowImage5FileType(file_type);
            }else if(slide_no === 6){
                setSlideshowImage6File(file);
                setSlideshowImage6FileType(file_type);
            }
            
            console.log(file.type);
            console.log(file.name);
            // console.log(file.type);
            // console.log(file.size);
            // console.log(file.lastModified);
        }
        reader.readAsDataURL(file);
     
    }

    // スライドショー用の画像ファイルをメモリに保存
    const onSlideshowImage1FileChange = (e: any) => {
        slideShowFileImageChange(e,1);
    }
    const onSlideshowImage2FileChange = (e: any) => {
        slideShowFileImageChange(e,2);
    }
    const onSlideshowImage3FileChange = (e: any) => {
        slideShowFileImageChange(e,3);
    }
    const onSlideshowImage4FileChange = (e: any) => {
        slideShowFileImageChange(e,4);
    }
    const onSlideshowImage5FileChange = (e: any) => {
        slideShowFileImageChange(e,5);
    }
    const onSlideshowImage6FileChange = (e: any) => {
        slideShowFileImageChange(e,6);
    }
    


    // SlideShowの画像をアップロード
    const uploadSlideshowImageToStorage = async (slide_number:number)=>{


        if(slide_number ==1 && slideshowImage1File && slideshowImage1FileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img1.${slideshowImage1FileType}`, slideshowImage1File);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

        if(slide_number == 2 && slideshowImage2File && slideshowImage2FileType){
           const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img2.${slideshowImage2FileType}`, slideshowImage2File);
           if (error) {
            console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

        if(slide_number == 3 && slideshowImage3File && slideshowImage3FileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img3.${slideshowImage3FileType}`, slideshowImage3File);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

        if(slide_number == 4 && slideshowImage4File && slideshowImage4FileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img4.${slideshowImage4FileType}`, slideshowImage4File);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

        if(slide_number == 5 && slideshowImage5File && slideshowImage5FileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img5.${slideshowImage5FileType}`, slideshowImage5File);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

        if(slide_number == 6 && slideshowImage6File && slideshowImage6FileType){
            const { data, error } = await supabaseClient.storage.from('public_showrooms').upload(`${companyId}/slideshow_img6.${slideshowImage6FileType}`, slideshowImage6File);
            if (error) {
                console.log('error', error);

                alert('ng');
            } else {
                console.log('data', data);

                alert('ok');
            }
        }

    }

    const uploadSlideshowImage1ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(1);
    }

    const uploadSlideshowImage2ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(2);
    }
    const uploadSlideshowImage3ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(3);
    }
    const uploadSlideshowImage4ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(4);
    }
    const uploadSlideshowImage5ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(5);
    }
    const uploadSlideshowImage6ToStorage = async ()=>{
        await uploadSlideshowImageToStorage(6);
    }

    const getMasters = async ()=>{

        if(user){
            const {data : sales_unit_master,error:sales_unit_master_error} = await supabaseClient.from('ka_sales_unit_master').select();
            if(sales_unit_master){
                setSalesUnitMaster(sales_unit_master);
            }


            const {data : selling_category_master,error:selling_category_master_error} = await supabaseClient.from('ka_selling_category_master').select();
            if(selling_category_master){
                setSellingCategoryMaster(selling_category_master);
            }

            const {data : compositon_master,error:compositon_master_error} = await supabaseClient.from('ka_composition_master').select();
            if(compositon_master){
                setCompositionMaster(compositon_master);
            }

            setIsLoadedMaster(true);
        }
    }

    const checkSelectedData = async ()=>{
        // Sale Unit
        let sales_unit = document.querySelector(`input[type='radio'][name='sales_unit']:checked`);
        let sales_unit_master_no = 0;
        if(sales_unit){
            let value = sales_unit.getAttribute('id');
            for(let i=0; i< salesUnitMaster.length; i++){
                let s_unit =  salesUnitMaster[i];
                if("salesunit_"+String(s_unit.master_no) == value){
                    sales_unit_master_no = s_unit.master_no;
                }
            }
        }
        console.log('selling_unit',sales_unit_master_no);

        // Selling Category Master Numbers.
        let selling_category_master_no =0;
        let selling_category_radio_btn = document.querySelector(`input[type='radio'][name='selling_category']:checked`);
        if(selling_category_radio_btn){
            let value = selling_category_radio_btn.getAttribute('id');
            for(let i=0; i< sellingCategoryMaster.length; i++){
                let s_category = sellingCategoryMaster[i];
                if("category_"+String(s_category.master_no) == value){
                    selling_category_master_no = s_category.master_no;
                }
            }
        }
        console.log('selling_category_master_no',selling_category_master_no);

        // Selling Category Master Numbers.
        let target_items = [];
        let composition = document.querySelectorAll(`[name='composition']:checked`);
        if(composition){
            for(let i= 0; i < composition.length; i++){
                let ptag = composition[i] as HTMLInputElement;
                console.log('checkedid',ptag,ptag.value);
                
                
                let target_item = compositionMaster.filter((d)=>{
                    return d.id == ptag.value;
                })

                target_items.push(target_item[0].id);
            }
        }
        console.log('private tag1',target_items);


    }

    useEffect(()=>{
        // 会社IDの取得
        if(user){
            (async ()=>{
                const {data,error} = await supabaseClient.from('ka_view_company_group_user').select().eq('user_id',user.id);
                if(data && data.length > 0){
                    setCompanyId(data[0].company_id);

                    // 会社情報の取得
                    const {data:company,error:company_error} = await supabaseClient.from('ka_company_profile').select().eq('company_id',data[0].company_id).eq('lang_id',1);

                    if(company && company.length > 0){
                        console.log(company);
                        setCompanyName(company[0].company_name);
                        setCompanyPostalCode(company[0].company_postal_code);

                        let address = company[0].state + company[0].city + company[0].street;
                        setCompanyAddress(address);
                    }

                    if(company_error){
                        console.log(company_error);
                    }

                    // 画像URLの取得
                    // supabase storageから画像をlistで取得。
                    // https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/ 以下のファイル全て
                    const {data:storage_data,error:storage_error} = await supabaseClient.storage.from('public_showrooms').list(String(data[0].company_id), {
                        limit: 100,
                        offset: 0,
                        sortBy: { column: 'name', order: 'asc' },
                    });

                    if(storage_data){
                        console.log('🐈',data[0].company_id,storage_data);
                        //  画像のURLを取得
                        for(let i=0; i< storage_data.length; i++){
                            let file = storage_data[i];
                            // . でファイル名と拡張子を分割する
                            let tmp_filename_list = file.name.split('.');
                            if(tmp_filename_list.length > 1){
                                //  ファイル名を取得
                                let filename = tmp_filename_list[0];
                                // 拡張子を取得
                                let extension = tmp_filename_list[1];
                                if(filename == 'cover_img'){
                                    let cover_img_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/cover_img.${extension}`
                                    setTopImageUrl(cover_img_url);
                                }

                                if(filename == 'slideshow_img1'){
                                    let slideshow_img1_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img1.${extension}`;
                                    setSlideshowImage1Url(slideshow_img1_url);
                                }

                                if(filename == 'slideshow_img2'){
                                    let slideshow_img2_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img2.${extension}`;
                                    setSlideshowImage2Url(slideshow_img2_url);
                                }

                                if(filename == 'slideshow_img3'){
                                    let slideshow_img3_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img3.${extension}`;
                                    setSlideshowImage3Url(slideshow_img3_url);
                                }

                                if(filename == 'slideshow_img4'){
                                    let slideshow_img4_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img4.${extension}`;
                                    setSlideshowImage4Url(slideshow_img4_url);
                                }

                                if(filename == 'slideshow_img5'){
                                    let slideshow_img5_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img5.${extension}`;
                                    setSlideshowImage5Url(slideshow_img5_url);
                                }

                                if(filename == 'slideshow_img6'){
                                    let slideshow_img6_url = `https://nyjwpdisufwugacajtqw.supabase.co/storage/v1/object/public/public_showrooms/${data[0].company_id}/slideshow_img6.${extension}`;
                                    setSlideshowImage6Url(slideshow_img6_url);
                                }
                            }                           
                        }
                    }

                    // マスターの取得
                    await getMasters();
                    setIsLoadedMaster(true)
                }
            })();
        }
    },[user]);

    useEffect(()=>{

        if(user && isLoadedMaster){
            // ka_company_supplier_infoから情報を取得し、マスターに紐づいた情報を反映する
            (async()=>{
                let showroom_plan_id = 1;
                let {data,error} = await supabaseClient.from('ka_company_supplier_info').select().eq('company_id',companyId).eq('showroom_plan_id',showroom_plan_id);
                if(data && data.length > 0){
                   let sales_unit_id = data[0].sales_unit_id;
                   let selling_category_id = data[0].selling_category_id;
                   let speciality = data[0].speciality;

                   if(sales_unit_id){
                        salesUnitMaster.forEach((d)=>{
                            let tag_id =  "salesunit_"+String(selling_category_id);
                            let tag = document.getElementById(tag_id);
                            if(tag){
                                (tag as HTMLInputElement).checked = true;
                            }
                        });
                    }

                    if(selling_category_id){
                        sellingCategoryMaster.forEach((d)=>{
                            let tag_id =  "category_"+String(selling_category_id);
                            let tag = document.getElementById(tag_id);
                            if(tag){
                                (tag as HTMLInputElement).checked = true;
                            }
                        });
                    }

                    if(speciality){
                        compositionMaster.forEach((d)=>{
                            for(let i=0; i<speciality.length; i++){
                                let tag_id =  "composition_"+String(speciality[i]);
                                let tag = document.getElementById(tag_id);
                                if(tag){
                                    (tag as HTMLInputElement).checked = true;
                                }
                            }
                            
                        });
                    }
                }
            })();

            
        }

    },[isLoadedMaster]);

    return (<div>
            <h1>Showroom Editor</h1>
            <div>会社情報</div>
            <div>User ID: {user ? user.id : ""}</div>
            <div>Comapany ID:{companyId}</div>


            {/*  
                ・専門：Wool, fast
                ・産地: 尾州
                ・量産背景: 在庫あり
            */}
            <div>
                <div>{companyName}</div>
                <div>{companyPostalCode}</div>
                <div>{companyAddress}</div>
            </div>

            {/*
                ・会社名
                ・郵便番号
                ・住所
            */}
            <div>

            </div>

            <div>
                 {/* 画像 */}
                 <div className={style.row}>
                        <img src={topImageUrl} />
                        <div className={style.title_column}>画像</div>
                        <div className={style.content_column}>
                            <input type="file" accept="image/*" onChange={onTopPageImageFileChange} />
                        </div>
                        {/* 読み込んだ画像を表示 */}
                        <div>
                         
                        </div>
                        <div>
                            <button onClick={uploadTopImageToStorage}>カバー画像をアップロード</button>
                        </div>
                </div>
            </div>


    
            <div>
                <div className={style.row}>
                <div className={style.title_column}>Sales Unit</div>
                    <div className={style.content_column}>
                        {salesUnitMaster.map((d)=>{
                            return ( <div className={style.button_container} key={d.id}>
                                <input id={`salesunit_${d.master_no}`} type="radio" name="sales_unit" />
                                <label htmlFor={`salesunit_${d.master_no}`}>{d.name}</label>
                            </div>)
                        })}
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.title_column}>カテゴリ</div>
                    <div className={style.content_column}>
                        {sellingCategoryMaster.map((d)=>{
                            return (  <div className={style.button_container}>
                                <input id={`category_${d.master_no}`} type="radio" name="selling_category" className={style.checkbox} />
                                <label htmlFor={`category_${d.master_no}`}>{d.name_jp}</label>
                            </div>)
                        })}
                    </div>
                </div>

                {/* 専門性とされているもの */}
                <div className={style.row}>
                    {compositionMaster.map((d)=>{
                        return (<div className={style.tab_button}><input type="checkbox" name="composition" id={`composition_${d.id}`} value={d.id} /><label htmlFor={`composition_${d.id}`}>{d.name_jp}</label></div>)
                    })}
                </div>  
            </div>
            <div>
                <div className={style.row}>
                    <div className={cstyle.btn} onClick={uploadOrRegisterData}>付加情報の登録/修正</div>
                </div>
            </div>

            {/* Standardプラン用: 6つの画像と文章*/}
            <div>

                <div>
                    {/* 画像 */}
                    <div className={style.row}>
                            <img src={slideshowImage1Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像1</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage1FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage1ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>

                    <div className={style.row}>
                            <img src={slideshowImage2Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像2</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage2FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage2ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>

                    <div className={style.row}>
                            <img src={slideshowImage3Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像3</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage3FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage3ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>


                    <div className={style.row}>
                            <img src={slideshowImage4Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像4</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage4FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage4ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>

                    <div className={style.row}>
                            <img src={slideshowImage5Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像5</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage5FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage5ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>


                    <div className={style.row}>
                            <img src={slideshowImage6Url} className={style.slidshow_img}/>
                            <div className={style.title_column}>画像6</div>
                            <div className={style.content_column}>
                                <input type="file" accept="image/*" onChange={onSlideshowImage6FileChange} />
                            </div>
                            {/* 読み込んだ画像を表示 */}
                            <div>
                            </div>
                            <div>
                                <button onClick={uploadSlideshowImage6ToStorage}>カバー画像をアップロード</button>
                            </div>
                    </div>

                </div>

            </div>
      

        {/* Preview */}
        <div>
            
        </div>
    </div>)
}

export default ShowroomEditor