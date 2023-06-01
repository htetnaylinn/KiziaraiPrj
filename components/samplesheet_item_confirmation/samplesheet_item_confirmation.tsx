import style from './samplesheet_item_confirmation.module.css';
import { useState,useRef } from 'react';

const SamplesheetItemConfirmation = ()=>{

    const [email,setEmail] = useState("");
    const [name, setName]  = useState("");
    const [count,setCount] = useState(0);

    return (<div className={style.container}>
        <div className={style.count_container}>{count}件</div>
        <div className={style.form_container}>
            <div className={style.label}>Email</div>
            <input type="text" />
            <div className={style.label}>お名前</div>
            <input type="text" />
        </div>
        <div className={style.send_btn}>送信</div>
    </div>)
}

export default SamplesheetItemConfirmation