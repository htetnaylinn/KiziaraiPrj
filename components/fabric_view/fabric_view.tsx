import style from './fabric_view.module.css'

const FabricView = ({kiziarai_id,texture_name_jp,description,width,weight} : any)=>{
    
    return (<div className={style.item_container}>
        <div className={style.item_center_line_container}>
        </div>
        <div className={style.title_container}>
            <img src="/imgs/logo.png" />
        </div>
        <div className={style.title_search_container}>
            <div className={style.search_btn}>条件を変えて検索</div>
        </div>

        <div className={style.flex_container}> 
            <div className={style.item_left_container}>
                <img src="/imgs/sphere_large.png" className={style.preview_img} />
            </div>
            <div className={style.item_right_container}>
                <div className={style.item_right_inner_container}>
                    <h2>{texture_name_jp}</h2>
                    <div className={style.product_id}>{kiziarai_id}</div>
                    <div className={style.product_text}>制作:</div>
                    <div className={style.product_text}>yamazaki-velvet co,ltd</div>
                    <div className={style.product_description}>{description}</div>
                    <div className={style.bookmark_btn}>Bookmark</div>
                    <div className={style.info_row}>Article: flower jacquard</div>
                    <div className={style.info_row}>Contents: polyester50</div>
                    <div className={style.info_row}>Width:  {width}cm</div>
                    <div className={style.info_row}>Weight: {weight}gsm</div>
                    <div className={style.info_row}>Company: ITCITEKI</div>
                    <div className={style.info_row}>Country: JAPAN</div>
                </div>

            </div>
        </div>
    </div>)
}

export default FabricView