import style from './alert_view.module.css'
import { useEffect,useState } from 'react'
import React from 'react';

const AlertView = (props : any) => {

    const [isShow ,setIsShow] = useState(false);
    const toggleAlert = ()=>{
        props.setAlertShow(false);
    }

    useEffect(()=>{
        setIsShow(true);
    },[]);

    return (<div className={style.bg_container}>
        <div className={isShow ? `${style.dialog_container} ${style.show}` : `${style.dialog_container}`}>
            <div className={style.title}>{props.title}</div>
            <div className={style.description}>{props.description}</div>
            <button onClick={toggleAlert}>OK</button>
        </div>
    </div>)
}

export default AlertView