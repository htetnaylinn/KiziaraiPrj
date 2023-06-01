import { useEffect,useState } from "react";
import style from './fabrics_list.module.css';
import SideMenu from "../../../components/side_menu/side_menu";
import FabricItem from "../../../components/fabric_item/fabric_item";
import BookmarkInfo from "../../../components/bookmark_info/bookmark_info";
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react'

const Fabrics = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [items,setItems] = useState<any[]>([]);
    const [count,setCount] = useState(0);

    useEffect(()=>{

        (async ()=>{
            // TODO: ローカライズしたデータに分割して、viewから取り出す形に変更する
            // ka_fabricからデータを取得する
            let {data, error} = await supabaseClient.from('ka_fabrics').select();

            if(data){
                console.log('a',data);
                setItems(data);
            }

        })();
    },[]);

    return (<div className={style.all_container}>
        <div className={style.left_container}>
            <SideMenu isBgWhite={true}/>
        </div>
       
        <div className={style.right_container}>
            <div className={style.title_container}>
                <img src="/imgs/logo.png" />

                <div className={style.search_container}>
                    <div className={style.search_inner_container}>
                        <div className={style.search_btn}>In Stock</div>
                        <div className={style.search_btn}>3D Texture</div>
                        <div className={style.search_btn}>Tiling Texture</div>
                        <div className={style.search_btn}>Weaven</div>
                        <div className={style.search_btn}>Cut & Sewn</div>
                        <div className={style.search_btn}>Ranking</div>
                    </div>
                </div>

                <BookmarkInfo />

                <div className={style.contents_container}>
                    {items.map((item)=>{
                        return <FabricItem item={item} />
                    })}
                </div>
            </div>
        </div>
    </div>)
}

export default Fabrics;