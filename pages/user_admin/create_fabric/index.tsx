import style from './create_fabric.module.css'
import SideMenu from '../../../components/side_menu/side_menu'
import { useEffect,useRef,useState } from 'react'
import BookmarkInfo from '../../../components/bookmark_info/bookmark_info'
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";
import FabricView from '../../../components/fabric_view/fabric_view';
import Router, { useRouter } from 'next/router';
import { useUserContext } from '../../../components/providers/UserContext';

const CreateFabric = ()=>{

    /*
        id (composition index)
        ratio_value: 0.0
        select name:
        comp_select_  
    */

    const {selectedLangId} = useUserContext();

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const router = useRouter();

    const [company,setCompany] = useState<string>("");

    const [fabricId,setFabricId] = useState<number>(0);
    const [companyId,setCompanyId] = useState<number>(0);

    const [isShowPreview,setIsShowPreview] = useState(false);
    const [fabricData,setFabricData] = useState<object>();


    const [isLoadedMaster,setIsLoadedMaster] = useState(false);

    const makerIdRef = useRef<HTMLInputElement>(null);
    const kiziaraiIdRef = useRef<HTMLInputElement>(null);

    const [compositionIndex,setCompositionIndex] = useState(0);
    const [compositionList,setCompositionList] = useState<any[]>([{id:0,ratio_value:0.0}]);


    const [isShowPrivateTag1,setIsShowPrivateTag1] = useState(true);
    const [isShowPrivateTag2,setIsShowPrivateTag2] = useState(false);
    const [isShowPrivateTag3,setIsShowPrivateTag3] = useState(false);

    
    const [colorMaster,setColorMaster]      = useState<any[]>([]);
    const [patternMaster,setPatternMaster]  = useState<any[]>([]);
    const [shapeMaster,setShapeMaster]      = useState<any[]>([]);

    // master_no, name, name_jp
    const [privateTag,setPrivateTag] = useState<any[]>([]);
    const [privateTagType1Items,setPrivateTagType1Items] = useState<any[]>([]);
    const [privateTagType2Items,setPrivateTagType2Items] = useState<any[]>([]);
    const [privateTagType3Items,setPrivateTagType3Items] = useState<any[]>([]);


    const [salesUnitMaster,setSalesUnitMaster] =  useState<any[]>([]);
    const [sellingCategoryMaster,setSellingCategoryMaster] = useState<any[]>([]);

   
    const [weightUnitMaster,setWeightUnitMaster] = useState<any[]>([]);
    const [widthUnitMaster, setWidthUnitMaster]  = useState<any[]>([]);

    const [compositionMaster, setCompositionMaster]  = useState<any[]>([]);
    const [referencePriceUnitMaster, setReferencePriceUnitMaster]  = useState<any[]>([]);

    const [moqMaster,setMoqMaster] = useState<any[]>([]);
    const [mcqMaster,setMcqMaster] = useState<any[]>([]);

    const nameJpRef = useRef<HTMLInputElement>(null);
    const nameEnRef = useRef<HTMLInputElement>(null);

    const widthValueRef  = useRef<HTMLInputElement>(null);
    const weightValueRef = useRef<HTMLInputElement>(null);

    const referenceUnitPriceMinValueRef = useRef<HTMLInputElement>(null);
    const referenceUnitPriceMaxValueRef = useRef<HTMLInputElement>(null);

    const moqValueRef  = useRef<HTMLInputElement>(null);
    const mcqValueRef = useRef<HTMLInputElement>(null);

    const productionLeadTimeRef = useRef<HTMLInputElement>(null);
    const sampleLeadTimeRef = useRef<HTMLInputElement>(null);

    const densityWValueRef  = useRef<HTMLInputElement>(null);
    const densityHValueRef  = useRef<HTMLInputElement>(null);

    const yarnWValueRef  = useRef<HTMLInputElement>(null);
    const yarnHValueRef  = useRef<HTMLInputElement>(null);

    const internalSharingsRef = useRef<HTMLTextAreaElement>(null);
    const productDetailRef = useRef<HTMLTextAreaElement>(null);

    // ローカライズ
    const localizedNameRef = useRef<HTMLInputElement>(null);
    const localizedDescriptionRef = useRef<HTMLTextAreaElement>(null);

    

    const selectPrivateTag1 = ()=>{
        setIsShowPrivateTag1(true);
        setIsShowPrivateTag2(false);
        setIsShowPrivateTag3(false);
    }

    const selectPrivateTag2 = ()=>{
        setIsShowPrivateTag1(false);
        setIsShowPrivateTag2(true);
        setIsShowPrivateTag3(false);
    }

    const selectPrivateTag3 = ()=>{
        setIsShowPrivateTag1(false);
        setIsShowPrivateTag2(false);
        setIsShowPrivateTag3(true);
    }

    const registerLocalizedInfo = async ()=>{

        if(localizedNameRef.current && localizedDescriptionRef.current){
            let localized_name        = localizedNameRef.current.value;
            let localized_description = localizedDescriptionRef.current.value;
            let {data,error} = await supabaseClient.from('ka_fabrics_lang_option').upsert({
                fabric_id: fabricId,
                company_id:companyId,
                texture_name: localized_name,
                description: localized_description,
                lang_id:selectedLangId
            });
            
            if(error){
                console.log(error);

                alert('ng');
            }else{
                console.log(data);

                alert('ok');
            }
        }
    }

    // 画像のアップロード ()
    // ka_fabrics
    const uploadImageToStorage = async (file: File)=>{
        if(kiziaraiIdRef.current){
            var kiziaraiId = kiziaraiIdRef.current.value;
            const { data, error } = await supabaseClient.storage.from('public_fabric_assets').upload(`${kiziaraiId}/3d/${file.name}`, file);
            if (error) {
                console.log('error', error);
            } else {
                console.log('data', data);
            }
        }
    }

    useEffect(()=>{

        (async ()=>{

            const {data: private_tag, error: private_tag_error} = await supabaseClient.from('ka_private_tag').select();
            if(private_tag){
                setPrivateTag(privateTag);

                let p1_list =private_tag.filter((d:any)=>{
                    return d.type == 1;
                });
                let p2_list =private_tag.filter((d:any)=>{
                    return d.type == 2;
                });
                let p3_list =private_tag.filter((d:any)=>{
                    return d.type == 3;
                });

                setPrivateTagType1Items(p1_list);
                setPrivateTagType2Items(p2_list);
                setPrivateTagType3Items(p3_list);
            

                console.log('private_tag',private_tag,p1_list);
            }

            const {data : sales_unit_master,error:sales_unit_master_error} = await supabaseClient.from('ka_sales_unit_master').select();
            if(sales_unit_master){
                setSalesUnitMaster(sales_unit_master);
            }

            const {data : selling_category_master,error:selling_category_master_error} = await supabaseClient.from('ka_selling_category_master').select();
            if(selling_category_master){
                setSellingCategoryMaster(selling_category_master);
            }

            const {data : weight_unit_master,error:weight_unit_master_error} = await supabaseClient.from('ka_weight_unit_master').select();
            if(weight_unit_master){
                setWeightUnitMaster(weight_unit_master);
            }

            const {data : width_unit_master,error:width_unit_master_error} = await supabaseClient.from('ka_width_unit_master').select();
            if(width_unit_master){
                setWidthUnitMaster(width_unit_master);
            }

            const {data : compositon_master,error:compositon_master_error} = await supabaseClient.from('ka_composition_master').select();
            if(compositon_master){
                setCompositionMaster(compositon_master);
            }

            const {data : reference_price_unit_master,error:reference_price_unit_master_error} = await supabaseClient.from('ka_reference_price_unit_master').select();
            if(reference_price_unit_master){
                setReferencePriceUnitMaster(reference_price_unit_master );
            }
            
            const {data : moq_master,error:moq_master_error} = await supabaseClient.from('ka_moq_master').select();
            if(moq_master){
                setMoqMaster(moq_master);
            }

            const {data : mcq_master,error:mcq_master_error} = await supabaseClient.from('ka_mcq_master').select();
            if(mcq_master){
                setMcqMaster(mcq_master);
            }

            const {data : color_master,error:color_master_error} = await supabaseClient.from('ka_color_master').select();
            if(color_master){
                setColorMaster(color_master);
            }

            const {data : pattern_master,error:pattern_master_error} = await supabaseClient.from('ka_pattern_master').select();
            if(pattern_master){
                setPatternMaster(pattern_master);
            }

            const {data : shape_master,error:shape_master_error} = await supabaseClient.from('ka_shape_master').select();
            if(shape_master){
                setShapeMaster(shape_master);
            }


            setIsLoadedMaster(true)

        })();
    },[]);



    useEffect(()=>{
        // すべてのRefの準備ができたら、fabricデータをロードする

        if(user){
            // query に id がある場合は、既存のデータをロードする
            if(router.query.id && isLoadedMaster){
                loadFabricDataFromKiziaraiId(String(router.query.id));
            }
        }
    },[user,router.query.id,isLoadedMaster]);

    // ka_fabricsから既存のデータをロードし、各refに反映する
    const loadFabricDataFromKiziaraiId = async (kiziarai_id:string)=>{
        let {data, error} = await supabaseClient.from('ka_fabrics').select().eq('kiziarai_id',kiziarai_id).single();
        if(data){

            setFabricId(data.id);
            setCompanyId(data.company_id);
            /**
             * creator_ka_id
             * sales_unit
             * texture_name_jp
             * texture_name_en
             * weight
             * weight_unit
             * width
             * width_unit
             * composition_json
             * image_json
             * min_reference_price
             * max_reference_price
             * reference_price_unit
             * moq
             * moq_unit
             * mcq
             * mcq_unit
             * production_lead_time
             * sample_lead_time
             * density_w
             * density_h
             * yarn_size_w
             * yarn_size_h
             * description
             * kiziarai_id
             * maker_id
             * selling_category_list
             * colors_array
             * patterns_array
             * shapes_array
             * private_tag_json
             * company_id
            */
            let creator_ka_id = data.creator_ka_id;
            let sales_unit = data.sales_unit;


            //  input[type='radio'][name='sales_unit']の値が、sales_unitのものをチェックする
            salesUnitMaster.forEach((d:any)=>{
                if(d.master_no == sales_unit){
                    let tag_id =  "salesunit_"+String(d.master_no);
                    let tag = document.getElementById(tag_id);
                    if(tag){
                        (tag as HTMLInputElement).checked = true;
                    } 
                }
            });

            let texture_name_jp = data.texture_name_jp;
            if(nameJpRef.current){
                nameJpRef.current.value = texture_name_jp;
            }

            let texture_name_en = data.texture_name_en;
            if(nameEnRef.current){
                nameEnRef.current.value = texture_name_en;
            }

            let weight = data.weight;
            if(weightValueRef.current){
                weightValueRef.current.value = weight;
            }
            let weight_unit = data.weight_unit;
            let width = data.width;
            if(widthValueRef.current){
                widthValueRef.current.value = width;
            }

            let width_unit = data.width_unit;
            let composition_json = data.composition_json;
            let image_json = data.image_json;
            let min_reference_price = data.min_reference_price;
            let max_reference_price = data.max_reference_price;
            let reference_price_unit = data.reference_price_unit;
            let moq = data.moq;
            let moq_unit = data.moq_unit;
            let mcq = data.mcq;
            let mcq_unit = data.mcq_unit;
            let production_lead_time = data.production_lead_time;
            let sample_lead_time = data.sample_lead_time;
            let density_w = data.density_w;
            let density_h = data.density_h;
            let yarn_size_w = data.yarn_size_w;
            let yarn_size_h = data.yarn_size_h;
            let description = data.description;
            
            let kiziarai_id = data.kiziarai_id;
            if(kiziaraiIdRef.current){
                kiziaraiIdRef.current.value = kiziarai_id;                
            }

            let maker_id = data.maker_id;
            if(makerIdRef.current){
                makerIdRef.current.value = maker_id;
            }


            let selling_category_list = data.selling_category_list;
  
            // selling_category_listの値を、input[type='radio'][name='selling_category']に反映する
            sellingCategoryMaster.forEach((d)=>{
                if(selling_category_list.includes(d.master_no)){
                    let tag_id =  "category_"+String(d.master_no);
                    let tag = document.getElementById(tag_id);
                    if(tag){
                        (tag as HTMLInputElement).checked = true;
                    }
                }
            });


            

            let colors_array = data.colors_array;
            let patterns_array = data.patterns_array;
            let shapes_array = data.shapes_array;
            let private_tag_json = data.private_tag_json;
            let company_id = data.company_id;

        

        }

    }

    const addNewComposition = ()=>{
    
        let list = compositionList;
        let index = compositionIndex;
        index++;

        list.push({id:index,ratio_value:0.0});
        setCompositionList(list);
        setCompositionIndex(index);

    }

    const getFabricObject = async ()=>{

        let selling_position_master_no = 0;
        
        // Selling Positon Master No.
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

        // MAKER ID
        let maker_id = makerIdRef.current?.value;
        console.log(maker_id);

        // KIZIARAI ID
        let kiziarai_id = kiziaraiIdRef.current?.value;
        console.log(kiziarai_id);

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


        // Category
        // private_tag1
        let target_items = [];
        let private_tag1 = document.querySelectorAll(`[name='private_tag1']:checked`);
        console.log(private_tag1);
        if(private_tag1){
            for(let i= 0; i < private_tag1.length; i++){
                let ptag = private_tag1[i] as HTMLInputElement;
                console.log('checkedid',ptag,ptag.value);
                
                let target_item = privateTagType1Items.filter((d)=>{
                    return d.id == ptag.value;
                })

                target_items.push({type:target_item[0].type,id:target_item[0].id});
            }
        }
        console.log('private tag1',target_items);
    
        let private_tag2 = document.querySelectorAll(`[name='private_tag2']:checked`);
        console.log(private_tag2);
        if(private_tag2){
            for(let i= 0; i < private_tag2.length; i++){
                let ptag = private_tag2[i] as HTMLInputElement;
                console.log('checkedid',ptag,ptag.value);
                
                let target_item = privateTagType2Items.filter((d)=>{
                    return d.id == ptag.value;
                })

                target_items.push({type:target_item[0].type,id:target_item[0].id});
            }
        }
        console.log('private tag2',target_items);

        let private_tag3 = document.querySelectorAll(`[name='private_tag3']:checked`);
        console.log(private_tag3);
        if(private_tag3){
            for(let i= 0; i < private_tag3.length; i++){
                let ptag = private_tag3[i] as HTMLInputElement;
                console.log('checkedid',ptag,ptag.value);
                
                let target_item = privateTagType3Items.filter((d)=>{
                    return d.id == ptag.value;
                })

                target_items.push({type:target_item[0].type,id:target_item[0].id});
            }
        }
        console.log('private tag3',target_items);

        let color = document.querySelectorAll(`[name='color_checkbox']:checked`);
        let colors = [];
        if(color){
            for(let i= 0; i < color.length; i++){
                let checkbox = color[i] as HTMLInputElement;
                colors.push(parseInt(checkbox.value));
            }
        }
        console.log('colors',colors);


        let pattern = document.querySelectorAll(`[name='pattern_checkbox']:checked`);
        let patterns = [];
        if(pattern){
            for(let i= 0; i < pattern.length; i++){
                let checkbox = pattern[i] as HTMLInputElement;
                patterns.push(parseInt(checkbox.value));
            }
        }
        console.log('patterns',patterns);


        let shape = document.querySelectorAll(`[name='shape_checkbox']:checked`);
        let shapes = [];
        if(shape){
            for(let i= 0; i < shape.length; i++){
                let checkbox = shape[i] as HTMLInputElement;
                shapes.push(parseInt(checkbox.value));
            }
        }
        console.log('shapes',shapes);


        // Name
        let name_jp = nameJpRef.current?.value;
        let name_en = nameEnRef.current?.value;
        console.log('name_jp',name_jp);
        console.log('name_en',name_en);

        let width_value  = widthValueRef.current?.value;
        let weight_value = weightValueRef.current?.value;

        console.log('width_value', width_value);
        console.log('weight_value',weight_value);


        let weight_select = document.querySelector('[name="weight_select"]') as HTMLSelectElement;
        let weight_select_value = weight_select.value;

        let width_select = document.querySelector('[name="width_select"]') as HTMLSelectElement;
        let width_select_value = width_select.value;

        console.log('weight_select_value', weight_select_value);
        console.log('width_select_value',width_select_value);


        // comp_select
        // comp_input
        let comp_json_obj = [];
        for(let i=0; i < compositionList.length; i++){
           let comp_obj = compositionList[i];
           let comp_id = comp_obj.id;
           
           let comp_input_ratio = document.getElementById(`comp_input_${comp_id}`) as HTMLInputElement;
           let comp_input_ratio_value = comp_input_ratio?.value;
           
           let comp_select = document.querySelector(`[name="comp_select_${comp_id}"]`) as HTMLSelectElement;
           let comp_select_value = comp_select?.value;
           
           let comp_master_no = 0;
           for(let j=0; j < compositionMaster.length; j++){
                let comp_master = compositionMaster[j];
                if(comp_master.name_jp == comp_select_value || comp_master.name == comp_select_value ){
                    comp_master_no = comp_master.master_no;
                }
            }

            comp_json_obj.push({
                master_no:comp_master_no,
                ratio:comp_input_ratio_value
            })

            console.log('comp_obj',comp_obj);
            console.log('comp_input_ratio_value',comp_input_ratio_value);
            console.log('comp_select_value',comp_select_value);
            console.log('comp_master_no',comp_master_no);
        }
        // 画像以外を取得し切る

        // COO
        let coo_select = document.querySelector(`[name="coo_select"]`) as HTMLSelectElement;
        let coo_value = coo_select?.value;
        console.log('coo_value',coo_value);

        // Reference Price Unit Select Value
        let reference_price_unit_select = document.querySelector(`[name="reference_price_unit_select"]`) as HTMLSelectElement;
        let reference_price_unit_select_value = reference_price_unit_select?.value;
        console.log('reference_price_unit_select_value',reference_price_unit_select_value);

        let referenceUnitPriceMinValue = referenceUnitPriceMinValueRef.current?.value;
        let referenceUnitPriceMaxValue = referenceUnitPriceMaxValueRef.current?.value;
        console.log('referenceUnitPriceMinValue',referenceUnitPriceMinValue);
        console.log('referenceUnitPriceMaxValue',referenceUnitPriceMaxValue);

        // MOQ   
        let moq_select = document.querySelector(`[name="moq_select"]`) as HTMLSelectElement;
        let moq_select_value = moq_select?.value;
        console.log('moq_value',moq_select_value);
  
        // MCQ   
        let mcq_select = document.querySelector(`[name="mcq_select"]`) as HTMLSelectElement;
        let mcq_select_value = mcq_select?.value;
        console.log('mcq_value',mcq_select_value);
  

        let moqValue = moqValueRef.current?.value;
        let mcqValue = mcqValueRef.current?.value;
        
        console.log('moqValue',moqValue);
        console.log('mcqValue',mcqValue);

        let productionLeadTimeValue = productionLeadTimeRef.current?.value;
        let sampleLeadTimeValue = sampleLeadTimeRef.current?.value;
        
        console.log('productionLeadTimeValue ',productionLeadTimeValue );
        console.log('sampleLeadTimeValue',sampleLeadTimeValue);


        let densityWValue = densityWValueRef.current?.value;
        let densityHValue = densityHValueRef.current?.value;
        
        console.log('densityWValue',densityWValue);
        console.log('densityHValue',densityHValue);

        let yarnWValue = yarnWValueRef.current?.value;
        let yarnHValue = yarnHValueRef.current?.value;
        
        console.log('yarnWValue',yarnWValue);
        console.log('yarnHValue',yarnHValue);

        let internalSharingsValue = internalSharingsRef.current?.value;
        console.log('internalSharings',internalSharingsValue);

        let productDetailValue = productDetailRef.current?.value;
        console.log('productDetail',productDetailValue);

        let sampleSheetOnOff = document.querySelector(`[name='samplesheet_onoff']:checked`) as HTMLInputElement;
        if(sampleSheetOnOff){
            console.log('sampleSheetOnOff',sampleSheetOnOff.value);

            if(sampleSheetOnOff.value == "on"){

            }else{

            }
        }

        let visible_area = document.querySelector(`[name='visible_area']:checked`) as HTMLInputElement;
        if(visible_area){
            console.log('visible_area',visible_area.value);
        }

        // 画像関連
        let img_json = [];

        return {
            creator_ka_id:"XYZA",
            texture_name_jp:name_jp,
            texture_name_en:name_en,
            weight:weight_value,
            weight_unit:weight_select_value, // master_no
            width:width_value,
            width_unit:width_select_value,// master_no
            composition_json:comp_json_obj,
            image_json:null,
            coo:coo_value,
            min_reference_price:referenceUnitPriceMinValue,
            max_reference_price:referenceUnitPriceMaxValue,
            reference_price_unit:reference_price_unit_select_value,
            moq:moqValue,
            moq_unit:moq_select_value,
            mcq:mcqValue,
            mcq_unit:mcq_select_value,
            production_lead_time:productionLeadTimeValue,
            sample_lead_time:sampleLeadTimeValue,
            density_w:densityWValue,
            density_h:densityHValue,
            yarn_size_w:yarnWValue,
            yarn_size_h:yarnHValue,
            description:productDetailValue,
            kiziarai_id:kiziarai_id,
            maker_id:maker_id,
            selling_category_list:[selling_category_master_no], // 要修正
            colors_array:colors,
            patterns_array:patterns,
            shapes_array:shapes,
            private_tag_json:target_items,
            sales_unit:sales_unit_master_no
        };

    }

    const registerData = async ()=>{
      
        let fabric_data = await getFabricObject();
        const {data: register_data, error: register_data_error} = await supabaseClient.from('ka_fabrics').insert(fabric_data).select();

        if(register_data){
            alert('ok');
        }else{
            alert('ng');
        }

        //*/

        console.log('insert data',register_data,register_data_error);

    }

    const previewData = async ()=>{
        let fabric_data = await getFabricObject();

        setIsShowPreview(true);
        setFabricData(fabric_data);

    }

    return (<>
        {  user ? 
            <div className={style.all_container}>
                <div className={style.left_container}>
                    <SideMenu isBgWhite={true}/>
                </div>
                <div className={style.right_container}>
                    <div className={style.user_data}>UserId:{user.id}</div>
                    <div className={style.form_container}>
                        <div className={`${style.row} ${style.row_single}`}>
                            <div className={style.title_container}>生地登録</div>
                        </div>
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
                            <div className={style.title_column}>メーカー品番</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={makerIdRef} />
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>KIZIARAI品番</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={kiziaraiIdRef} />
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
                        <div className={style.row}>
                            <div className={style.title_column}>名前</div>
                            <div className={style.content_column_nopadding}>
                                <div className={style.input_row}>
                                    <div className={style.name_label}>名前:</div>
                                    <input type="text" className={style.input_text} ref={nameJpRef} />  
                                </div>
                                <div className={style.input_row}>
                                    <div className={style.name_label}>Name:</div>
                                    <input type="text" className={style.input_text} ref={nameEnRef} />  
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>Weight</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={weightValueRef} />
                                <select name="weight_select">
                                    {weightUnitMaster.map((d)=>{
                                        return (<option key={d.id} value={d.master_no}>{d.name}</option>)
                                    })}
                                </select> 
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>Width</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={widthValueRef}/>
                                <select name="width_select">
                                    {widthUnitMaster.map((d)=>{
                                        return (<option key={d.id} value={d.master_no}>{d.name}</option>)
                                    })}
                                </select> 
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>混率</div>
                            <div className={style.content_column}>
                                
                                {compositionList.map((d1)=>{

                                    return (
                                        <div className={style.mix_row} key={`comp_list_${d1.id}`}>
                                            <div className={style.mix_column}>
                                                <select name={`comp_select_${d1.id}`} key={`comp_select_${d1.id}`}>
                                                    {compositionMaster.map((d)=>{
                                                        return ( <option>{d.name_jp}</option>)
                                                    })}
                                                </select> 
                                            </div>
                                            <div className={style.mix_column}>
                                                <input type="text" className={style.input_text} id={`comp_input_${d1.id}`} defaultValue={d1.ratio_value} /> %
                                            </div>
                                        </div>
                                    )

                                })}

                                <div onClick={addNewComposition} className={style.add_btn}>追加</div>
                                
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>プライベートタグ</div>
                            <div className={style.content_column}>
                                <div className={style.tab_container}>
                                        <div className={style.tab_tag_type} onClick={selectPrivateTag1}>原料・柄・種類</div>
                                        <div className={style.tab_tag_type} onClick={selectPrivateTag2}>機能</div>
                                        <div className={style.tab_tag_type} onClick={selectPrivateTag3}>組織</div>
                                </div>

                            
                                <div className={isShowPrivateTag1 ? style.tab_buttons : style.tab_buttons_hidden} >
                                    {privateTagType1Items.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="private_tag1" id={`privatetag1_${d.id}`} value={d.id} /><label htmlFor={`privatetag1_${d.id}`}>{d.name_jp}</label></div>)
                                    })}
                                </div>
                    
                                <div className={isShowPrivateTag2 ? style.tab_buttons : style.tab_buttons_hidden} >
                                    {privateTagType2Items.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="private_tag2" id={`privatetag2_${d.id}`} value={d.id} /><label htmlFor={`privatetag2_${d.id}`}>{d.name_jp}</label></div>)
                                    })}
                                </div>
                        
                                <div className={isShowPrivateTag3 ? style.tab_buttons : style.tab_buttons_hidden} >
                                    {privateTagType3Items.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="private_tag3" id={`privatetag3_${d.id}`} value={d.id} /><label htmlFor={`privatetag3_${d.id}`}>{d.name_jp}</label></div>)
                                    })}
                                </div>
                            </div>
                        </div>


                        <div className={style.row}>
                            <div className={style.title_column}>カラー</div>
                            <div className={style.content_column}>
                                <div className={style.tab_buttons} >
                                    {colorMaster.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="color_checkbox" id={`color_checkbox_${d.id}`} value={d.master_no} /><label htmlFor={`color_checkbox_${d.id}`}>{d.name_jp}</label></div>)
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>パターン</div>
                            <div className={style.content_column}>
                                <div className={style.tab_buttons} >
                                    {patternMaster.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="pattern_checkbox" id={`pattern_checkbox_${d.id}`} value={d.master_no} /><label htmlFor={`pattern_checkbox_${d.id}`}>{d.name_jp}</label></div>)
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>Shape</div>
                            <div className={style.content_column}>
                                <div className={style.tab_buttons} >
                                    {shapeMaster.map((d)=>{
                                        return (<div className={style.tab_button}><input type="checkbox" name="shape_checkbox" id={`shape_checkbox_${d.id}`} value={d.master_no} /><label htmlFor={`shape_checkbox_${d.id}`}>{d.name}</label></div>)
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>アップロード</div>
                            <div className={style.content_column}>
                                <div className={style.upload_img_container}>
                                    <div className={style.file_title}>2D Photo</div>
                                    <div className={style.img_drop_container}></div>
                                    <div className={style.preivew}></div>
                                </div>
                                <div className={style.upload_img_container}>
                                    <div className={style.file_title}>3D</div>
                                    <div className={style.img_drop_container}></div>
                                    <div className={style.preivew}></div>
                                </div>
                                <div className={style.upload_img_container}>
                                    <div className={style.file_title}>MP4</div>
                                    <div className={style.img_drop_container}></div>
                                    <div className={style.preivew}></div>
                                </div>
                                <div className={style.upload_img_container}>
                                    <div className={style.file_title}>File</div>
                                    <div className={style.img_drop_container}></div>
                                    <div className={style.preivew}></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>COO 原産地証明国</div>
                            <div className={style.content_column}>
                                <div className={style.mix_column}>
                                    <select name="coo_select">
                                        <option>Japan</option>
                                        <option>China</option>
                                    </select> 
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>参考価格</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={referenceUnitPriceMinValueRef} /> 〜
                                <input type="text" className={style.input_text} ref={referenceUnitPriceMaxValueRef} />
                                <div className={style.mix_column}>
                                    <select name="reference_price_unit_select">
                                        {referencePriceUnitMaster.map((d)=>{
                                            return ( <option key={d.id} value={d.master_no}>{d.name}</option>)
                                        })}
                                    </select> 
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>MOQ(全体最小発注数量)</div>
                            <div className={style.content_column}>
                            <input type="text" className={style.input_text} ref={moqValueRef} />
                                <div className={style.mix_column}>
                                    <select name="moq_select">
                                        {moqMaster.map((d)=>{
                                            return (<option key={d.id} value={d.master_no}>{d.name}</option>)
                                        })}
                                    </select> 
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>MCQ(Color最小発注数量)</div>
                            <div className={style.content_column}>
                            <input type="text" className={style.input_text}  ref={mcqValueRef}  />
                                <div className={style.mix_column}>
                                <select name="mcq_select">
                                        {mcqMaster.map((d)=>{
                                            return (<option key={d.id} value={d.master_no}>{d.name}</option>)
                                        })}
                                    </select> 
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>Production Lead Time</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={productionLeadTimeRef} /> days
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>Sample Lead Time</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={sampleLeadTimeRef}/> days
                            </div>
                            
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>密度 Density</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={densityWValueRef} /> x
                                <input type="text" className={style.input_text} ref={densityHValueRef} />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>番手 yarn size</div>
                            <div className={style.content_column}>
                                <input type="text" className={style.input_text} ref={yarnWValueRef} /> x
                                <input type="text" className={style.input_text} ref={yarnHValueRef} />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>社内共有</div>
                            <div className={style.content_column}>
                                <textarea ref={internalSharingsRef}></textarea>
                            </div>
                        </div>

                        {/*
                        <div className={style.row}>
                            <div className={style.title_column}>商品説明</div>
                            <div className={style.content_column}>
                            <textarea  ref={productDetailRef}></textarea>
                            </div>
                        </div>
                        */}

                        <div className={style.row}>
                            <div className={style.title_column}>表示設定 サンプルシート</div>
                            <div className={style.content_column}>
                            <div className={style.button_container}>
                                    <label htmlFor='position1'>ON</label>
                                    <input value="on" type="radio" name="samplesheet_onoff" />
                                </div>
                                <div className={style.button_container}>
                                    <label htmlFor='position2'>OFF</label>
                                    <input value="off" type="radio" name="samplesheet_onoff"/>
                                </div>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.title_column}>表示設定 表示エリア</div>
                            <div className={style.content_column}>
                            <div className={style.button_container}>
                                    <label htmlFor='position1'>国内のみ</label>
                                    <input id='position1' value="1" type="radio" name="visible_area" />
                                </div>
                                <div className={style.button_container}>
                                    <label htmlFor='position2'>すべての地域に表示</label>
                                    <input id='position2' value="2" type="radio" name="visible_area"/>
                                </div>
                                <div className={style.button_container}>
                                    <label htmlFor='position2'>海外のみに表示</label>
                                    <input id='position2' value="3" type="radio" name="visible_area"/>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={style.button_center_container}>
                        <div className={style.button} onClick={registerData}>register</div>
                        <div className={style.button} onClick={previewData}>Preview</div>
                    </div>

                    { /* ローカライズ部分 */}
                    <div className={style.form_container}>
                        <div className={style.row}>
                            <div className={style.title_column}>生地名</div>
                            <div className={style.content_column}>
                                <input type='text' className={style.input_text} ref={localizedNameRef} />
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.title_column}>説明</div>
                            <div className={style.content_column}>
                                <textarea ref={localizedDescriptionRef}></textarea>
                            </div>
                        </div>
                        <div className={style.button} onClick={registerLocalizedInfo}>ローカライズ情報の登録</div>
                    </div>

                 
                </div>
                <BookmarkInfo/>
                <div className={style.preview_outer_container}>
                    <div className={style.preview_container}>
                        {isShowPreview ? <FabricView {...fabricData} /> : <></>} 
                    </div>
                </div>
            </div>
        : <>not signed in</>
        }
        </>
    )
}

export default CreateFabric;