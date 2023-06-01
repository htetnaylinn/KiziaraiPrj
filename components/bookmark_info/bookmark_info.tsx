import style from './bookmark_info.module.css'

const BookmarkInfo = ()=>{

    return (<div>
        <div className={style.container}>
            <img src="/imgs/heart.svg" className={style.bookmark_icon} />
            <div className={style.bookmark_param}>生地 13</div>
            <div className={style.bookmark_param}>会社 5</div>
        </div>
    </div>)
}
export default BookmarkInfo;