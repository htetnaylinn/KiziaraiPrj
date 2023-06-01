import style from './bookmark_item_company.module.css';

const BookmarkItemCompany = ()=>{
    return (<div className={style.container}>
        <div className={style.photo_container}>
         <div className={style.photo_inner_container}><img src='/imgs/kizi_company.jpg' /></div>
     </div>
     <div className={style.company_name}>Yamazaki-vevet co,ltd</div>
     <div className={style.prefecture_name}>富山</div>
     <div className={style.material_name}>コットン</div>
 </div>)

}

export default BookmarkItemCompany