import style from './chat_chat.module.css'
import ChatProfileLeft from '../chat_profile_left/chat_profile_left'
import ChatProfileRight from '../chat_profile_right/chat_profile_right'
import ChatMessage from '../chat_message/chat_message'
import { useState, useEffect, useRef } from 'react'

const ChatChat = (props : any)=>{

    const [messages,setMessages] = useState<any[]>([]);
    const [textToPost, setTextToPost] = useState<string>("")
    const [thread, setThread] = useState<any>()
    const [userProfile, setUserProfile] = useState<any>()

    useEffect(()=>{
        setMessages(props.messages);
        setThread(props.thread)
        setUserProfile(props.userProfile)
    },[props]);

    const onClickAgent = () => {
        props.onClickAgent()
    }

    const onClickPost = () => {
        if (textToPost.length > 0) {
            document.getElementById("messages-inner-container")!.scrollTop = 0
            props.onClickPost(textToPost)
            setTextToPost("")
        }
    }

    return (<div className={style.container}>

    <div className={style.chat_area_profile_container}>
    <div className={style.chat_profile_others}>
        <ChatProfileLeft thread={thread} />
    </div>
    <div className={style.chat_profile_self}>
        <ChatProfileRight userProfile={userProfile} />
    </div>
</div>


<div className={style.messages_container}>
    <div id="messages-inner-container" className={style.message_inner_container}>
        {messages.map((d)=>{
            return <ChatMessage isLeft={d.isLeft} userIconUrl={d.userIconUrl} message={d.message} date={d.date} isNew={d.isNew} />
        })}
    </div>
</div>

<div className={style.chat_input_container}>

    <div className={style.chat_buttons_container}>
        <div className={style.chat_buttons_left_container}>
            <div className={style.chat_buttons_row}>
                <div className={style.chat_button} onClick={ () => onClickAgent() }>
                    <img src="/imgs/icon_people.svg" className={style.icon_img} />
                </div>
                <div className={style.chat_button}>
                    <img src="/imgs/icon_photo.svg" className={style.icon_img} />
                </div>
            </div>

        </div>

        <div className={style.chat_buttons_middle_container}>
            <div className={style.chat_buttons_row}>
                <div className={style.chat_button}>
                    <img src="/imgs/icon_dollar.svg" className={style.icon_img} />
                </div>
                <div className={style.chat_button}>
                    <img src="/imgs/icon_chat.svg" className={style.icon_img} />
                </div>
                <div className={style.chat_button}>
                    <img src="/imgs/icon_text.svg" className={style.icon_img} />
                </div>
                <div className={style.chat_button}>
                    <img src="/imgs/icon_translation.svg" className={style.icon_img} />
                </div>
            </div>
        </div>

        <div className={style.chat_buttons_right_container}>
        <div className={style.chat_buttons_row}>
              
            </div>  
        </div>
    </div>

    <div className={style.chat_message_field_container}>
        <div className={style.chat_message_field}>
            <textarea onChange={e => setTextToPost(e.target.value)} value={textToPost}></textarea>
        </div>
        <div className={style.chat_message_send_btn} onClick={ () => onClickPost() }>送信</div>
    </div>
</div>
</div>)
}
export default ChatChat