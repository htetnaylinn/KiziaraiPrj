import { useState } from 'react'
import style from './fabric_item_detail_info.module.css'

const FabricItemDetailInfo = ()=>{

    const [kiziId,setKiziId]   = useState();
    const [creator,setCreator] = useState();


    const [productName,setProductName]     = useState("");

    const [productDescription,setProductDescription]     = useState("");

    const [fabricName,setFabricName]     = useState("");
    const [materialName,setMaterialName] = useState("");

    const [width,setWidth] = useState("");
    const [weight,setWeight] = useState("");

    const [company,setCompany] = useState("");
    const [country,setCountry] = useState("");

    return (<div>
        <p>{productName}</p>
        <p>{productDescription}</p>

        <p>{fabricName}</p>
        <p>{materialName}</p>
        
        <p>{width}</p>
        <p>{weight}</p>

        <p>{company}</p>
        <p>{country}</p>


    </div>)
}

export default FabricItemDetailInfo