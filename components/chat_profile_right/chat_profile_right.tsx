import style from './chat_profile_right.module.css'
import { useState, useEffect } from 'react'

const ChatProfileRight = (props: any)=>{
    const [iconUrl, setIconUrl]  = useState("");
    const [userName,setUserName] = useState("");

    useEffect(()=>{
        if (props.userProfile) {
            setIconUrl(props.userProfile.iconUrl)
            setUserName(props.userProfile.name)
        }
    },[props]);


    return (<div className={style.container}>
          <div className={style.img_container}>
            <img src={iconUrl} />
        </div>
        <div className={style.profile_data_container}>
            <div className={style.profile_data_left_inner_container}>
                <div>{userName}</div>
            </div>
    </div></div>)
}

export default ChatProfileRight