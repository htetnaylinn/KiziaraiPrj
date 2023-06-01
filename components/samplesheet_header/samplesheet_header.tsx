import style from './samplesheet_header.module.css'
import { useState } from 'react'

const SamplesheetHeader = (props :any)=>{


    return (<div><div className={style.logo_container}>
        <img src="/imgs/logo.png" />
        </div>
        <div className={style.company_name_container}>{props.company_name}</div>
        <div className={style.exhibition_name_container}>{props.event_name}</div>
    </div>)
}

export default SamplesheetHeader


