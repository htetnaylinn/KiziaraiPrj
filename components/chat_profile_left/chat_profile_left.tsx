import style from './chat_profile_left.module.css'
import { useState, useEffect } from 'react';

const ChatProfileLeft = (props: any)=>{

    const [iconUrl, setIconUrl] = useState("")
    const [name, setName] = useState("")

    useEffect(()=>{
        if (props.thread) {
            setIconUrl(props.thread.iconUrl)
            setName(props.thread.threadName)
        }
    },[props]);

    return (<div className={style.container}>
        <div className={style.img_container}>
            <img src={iconUrl} />
        </div>
        <div className={style.profile_data_container}>
            <div className={style.profile_data_left_inner_container}>
                <div>法人/米国</div>
                <div>LVMH</div>
                <div>xxxxx部 担当:{name}</div>
            </div>
            <div className={style.profile_data_middle_container}>
                <div>WEB: https://www.abc.com/</div>
                <div>専門: aaa, bbb, ccc</div>
            
            </div>
            <div className={style.profile_data_right_container}>
                <div className={style.block_btn}>ブロックする</div>
                <div className={style.detail_btn}>詳細を見る</div>
            </div>
        </div>
    </div>)
}

export default ChatProfileLeft