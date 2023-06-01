import style from './samplesheet_item.module.css'
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const SamplesheetItem = (props : any)=>{

    const [isOpen,setIsOpen] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false)

    const [isLike,setIsLike] = useState(false);

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    useEffect(()=>{
        if(user && props.fabric.id && props.samplesheetId){
            (async ()=>{
                let {data,error} = await supabaseClient.from('ka_samplesheet_users_feedback').select().eq('user_id',user.id).eq('fabric_id',props.fabric.id).eq('samplesheet_id',props.samplesheetId);
                if(data){
                    if(data.length > 0){
                          setIsLike(true);
                    }else{
                        setIsLike(false);
                    }
                }else{
                    setIsLike(false);
                }
            })();

        }
        
    },[user,props.fabric]);

    // ka_samplesheet_users_feedbackにupsert
    // samplesheet_id, fabric_id, user_id, like, comments
    const toggleLike = async ()=>{

        if(user){

            let new_like = !isLike;
          
            let samplesheet_id = props.samplesheetId;
            let fabric_id = props.fabric.id;
            let user_id = user.id;
            let like = new_like;
            let comments = "";

            let {data,error} = await supabaseClient.from('ka_samplesheet_users_feedback').upsert({samplesheet_id,fabric_id,user_id,like,comments}).select();
            if(data){
                alert('like');
                console.log('data',data);

                setIsLike(new_like);
            }
            if(error){
                console.log('error',error);
                setIsLike(new_like);
            }
        }

    }

    return (
    <div className={style.container}>
        {showConfirm ? <></> :
        <>
        <div className={style.up_container}>
            <div className={style.checkmark_container}></div>
        
            <div className={style.image_container}>
                <img src='/imgs/detail_mini.jpg'/>
            </div>
            <div className={style.info_container}>
                <div className={style.productId1}>{props.fabric.kiziarai_id}</div>
                <div className={style.productId2}>{props.fabric.maker_id}</div>
                <div className={style.title}>{props.fabric.texture_name_jp}</div>
            </div>
            <div className={style.btn_container}>

                <div className={style.like_btn} onClick={toggleLike}>{isLike ? "✔︎": "-"} Like</div>

                <div className={style.comment_btn_container}>
                    <p>コメントする</p>
                    <img src="/imgs/icon_chat.svg" />

                </div>
            </div>
        </div>

        {isOpen ?  <div className={style.down_container}>
                    <p>コメントをここに表示する。コメントをここに表示する。
        コメントをここに表示する。コメントをここに表示する。
        コメントをここに表示する。コメントをここに表示する。
        コメントをここに表示する。コメントをここに表示する。
        コメントをここに表示する。コメントをここに表示する。
        コメントをここに表示する。コメントをここに表示する。
        </p>
                </div> : <></>
            }</>
        }
        </div>)
}

export default SamplesheetItem;