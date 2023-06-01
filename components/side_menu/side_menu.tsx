import style from './style.module.css'
import Link from 'next/link';

const SideMenu = (props : any)=>{

    return (<div className={props.isBgWhite ? style.container_white  : style.container}>
        <div className={style.menu_btn}>Home</div>
        <Link href="/chat/"><div className={style.menu_btn}>Chat</div></Link>
        <Link href="/bookmarks/"><div className={style.menu_btn}>K2</div></Link>
        <Link href="/fabrics/list"><div className={style.menu_btn}>Bookmark</div></Link>
        <Link href="/companies/list"><div className={style.menu_btn}>K1</div></Link>
    
        <Link href="/samplesheet/1"><div className={style.menu_btn}>Sample Sheet</div></Link>
    </div>)
}

export default SideMenu;