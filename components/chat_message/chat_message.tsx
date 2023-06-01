import { useState,useEffect } from "react";
import style from './chat_message.module.css';

const ChatMessage = (props :any)=>{

    // 吹き出し左か右か
    const [isLeft,setIsLeft] = useState(true);

    // 最新のコメントかどうか
    const [isNew,setIsNew]  = useState(false);

    const [userIconUrl,setUserIconUrl] = useState("");
    const [message,setMessage]         = useState("");
    const [date,setDate]  = useState("");

    // console.log('🐮');
    // console.log(userIconUrl);

    useEffect(()=>{
        setIsLeft(props.isLeft);
        setUserIconUrl(props.userIconUrl);
        setMessage(props.message);
        setDate(props.date);
        setIsNew(props.isNew);
    },[props]);

    return (<div className={style.row}>
    {isLeft ?
        <div className={style.container}>
            <div className={style.message_main_container}>
                <div className={style.icon_container}>
                    <img src={userIconUrl} />
                </div>

                <div className={ isNew? `${style.message_container} ${style.message_container_new}` : style.message_container}>
                    <p className={style.message}>{message}</p>
                </div>
            </div>
            <div className={style.message_sub_container}>
                <div className={style.date}>{date}</div>
            </div>
        </div>
        :
        <div className={`${style.container} ${style.container_right}`}>
            <div className={style.message_main_container}>
                <div className={ isNew? `${style.message_container} ${style.message_container_new}` : style.message_container}>
                    <p className={style.message}>{message}</p>
                </div>

                <div className={style.icon_container}>
                    <img src={userIconUrl} />
                </div>
            </div>
            <div className={style.message_sub_container}>
                <div className={style.date_right}>{date}</div>
            </div>
        </div> }
    </div>);
}
export default ChatMessage