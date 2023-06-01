import style from './chat_top.module.css';
import Link from 'next/link';

const ChatTop = ()=>{

    return (<div className={style.container}>
        <div className={style.inner_container}>
            
            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                    <Link href="/user_admin/account"><div className={style.btn}>アカウントパスワード</div></Link>
                    <div className={style.btn}>Plan</div>
                    <Link href="/user_admin/company_info"><div className={style.btn}>会社情報</div></Link>
                    <Link href="/user_admin/ui_preferences"><div className={style.btn}>表示設定</div></Link>
                </div>
            </div>

            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/fabrics"><div className={style.btn}>Fabric</div></Link>
                <Link href="/user_admin/create_fabric"><div className={style.btn}>Create Fabric</div></Link>
                <Link href="/user_admin/samplesheet"><div className={style.btn}>サンプルシート</div></Link>
                <Link href="/user_admin/samplesheet_editor"><div className={style.btn}>サンプルシート エディター</div></Link>
                </div>
            </div>

            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/stripe"><div className={style.btn}>Stripe</div></Link>
                </div>
            </div>

            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/stripe"><div className={style.btn}>Ranking</div></Link>
                <Link href="/user_admin/analytics"><div className={style.btn}>収益分析</div></Link>
                </div>
            </div>

            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/option"><div className={style.btn}>Options</div></Link>
                </div>
            </div>


            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/points"><div className={style.btn}> ポイント</div></Link>
                </div>
            </div>

            <div className={style.menu_block}>
                <div className={style.icon_container}>
                    
                </div>
                <div className={style.menu_container}>
                <Link href="/user_admin/faq"><div className={style.btn}>FAQ・利用規約</div></Link>
                </div>
            </div>


        </div>
    </div>)
}
export default ChatTop