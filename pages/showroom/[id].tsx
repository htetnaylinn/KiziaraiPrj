import style from './showroom.module.css'
import SideMenu from '../../components/side_menu/side_menu'
import BookmarkInfo from '../../components/bookmark_info/bookmark_info'

const ShowRoom = ()=>{

    return (<div className={style.all_container}>
        <div className={style.left_container}>
        <SideMenu isBgWhite={true}/>
        </div>
        <div className={style.right_container}>
         
        </div>
        <BookmarkInfo />
    </div>)
}

export default ShowRoom