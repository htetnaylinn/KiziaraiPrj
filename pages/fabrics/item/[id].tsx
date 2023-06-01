import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useState,useEffect} from "react";
import style from './item.module.css'
import BookmarkInfo from "../../../components/bookmark_info/bookmark_info";
import SideMenu from "../../../components/side_menu/side_menu";
import FabricView from "../../../components/fabric_view/fabric_view";
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";
import axios from "axios";

const FabricItemPage = ()=>{
   
    const [imgSrc,setImgSrc] = useState("");
    const router = useRouter();
    const [itemId,setItemId] = useState("");
    const [fabricData,setFabricData] = useState<object>();

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    useEffect(()=>{

        
    },[user]);

    useEffect(()=>{
        let query_id = router.query.id;
        if(query_id){
            setItemId(query_id as string);

            (async  ()=>{
                let {data,error} = await supabaseClient.from('ka_fabrics').select().eq('kiziarai_id',query_id).single();

                console.log(data,error);
                if(data){
                    setFabricData(data);

                    let post_body = {fabric_id:data.id};

                    console.log('---- pv ----');

                    await axios.post('/api/fabric_pv/add_pv',post_body).then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err);
                    });

                    // PV数の取得
                    await axios.post('/api/fabric_pv/get_pv',post_body).then((res)=>{
                        console.log('get pv',res,res.data.message);
                    })
                    .catch((err)=>{
                        console.log('get pv',err);
                    });
                }
            })();
        }
    },[router]);

    return (<div className={style.all_container}>

        <div className={style.left_container}>
            <SideMenu isBgWhite={true}/>
        </div>
        <div className={style.right_container}>
            <FabricView {...fabricData} />
           
        </div>
        <BookmarkInfo />
    
    </div>)
}
export default FabricItemPage;