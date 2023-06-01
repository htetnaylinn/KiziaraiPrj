import style from './fabric_item_detail.module.css';
import FabricItemDetailImage from '../fabric_item_detail_image/fabric_item_detail_image';
import FabricItemDetailInfo from '../fabric_item_detail_info/fabric_item_detail_info';
import { useState } from 'react';
import BookmarkIcon from '../bookmark_icon/boomark_icon';

const FabricItemDetail = ()=>{

    const [page,setPage] = useState("");
    const [maxPage,setMaxPage] = useState("");

    return (<div className={style.all_container}>

        <FabricItemDetailImage />
        <FabricItemDetailInfo />

        <BookmarkIcon />

    </div>)
}

export default FabricItemDetail;