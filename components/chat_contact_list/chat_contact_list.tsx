import style from './chat_contact_list.module.css'
import { useEffect,useState } from 'react'

const ChatContactList = (props : any)=>{

    const [data,setData] = useState<any[]>([]);

    useEffect(()=>{
        setData(props.threads);
    },[props]);

    const onClickThread = (threadId: number) => {
        props.onClickThread(threadId)
    }

    return (<div>
        {data.map((d)=>{
            return (<div onClick={ () => onClickThread(d.threadId) } className={style.row}>
                <div className={style.img_container}>
                    <img src={d.iconUrl} />
                </div>
                <div className={style.profile_data_container}>   
                        <div>{d.threadName}</div>
                </div>
            </div>)
        })}

    </div>)
}
export default ChatContactList