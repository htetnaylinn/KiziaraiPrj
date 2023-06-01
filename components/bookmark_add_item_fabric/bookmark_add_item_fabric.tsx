import style from './bookmark_add_item_fabric.module.css'
import { useState,useEffect } from 'react';
import FabricItem from '../fabric_item/fabric_item';

const BookmarkAddItemFabric = ()=>{

    const [data,setData] = useState<any[]>([]);

    useEffect(()=>
    {
        let list = ["","","",""];
        setData(list);
        
    },[]);

    return (<div className={style.container}>
        <div className={style.close_btn_container}>
            <div className={style.close_btn}>閉じる</div>
        </div>
        <div className={style.descripton_container}>
            追加したいアイテムの選択
        </div>
        <div className={style.items_container}>

            {data.map((d)=>{
            return <FabricItem/>
            })}

        </div>

    </div>)
}
export default BookmarkAddItemFabric;