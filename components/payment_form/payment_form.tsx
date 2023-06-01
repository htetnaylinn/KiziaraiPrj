import style from './style.module.css'
import cstyle from '../css/style.module.css'

import { useState,useEffect,useRef } from 'react';
import { useSupabaseClient,useUser } from '@supabase/auth-helpers-react';


const PaymentForm = (props  :any) => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    // 支払い側のグループID　請求先
    const [sourceGroupId,setSourceGroupId] = useState<number>(0);

    // 受け取り側のグループID　請求元
    const [targetGroupId,setTargetGroupId] = useState<number>(0);


    // 支払い側のユーザーID　請求先
    const [sourceUserId,setSourceUserId] = useState<number>(0);

    // 受け取り側のユーザーID　請求元
    const [targetUserId,setTargetUserId] = useState<number>(0);
    
    //　請求する金額　
    const [amount,setAmount] = useState<number>(0);

    // 通貨の種類　1:JPY 2:USD
    const [currencyType,setCurrencyType] = useState<number>(1);

    // Fabric ID
    const [fabricId,setFabricId] = useState<number>(0);

    // 説明文
    const [description,setDescription] = useState<string>("");

    /*
        id
        created_at
        source_group_id
        target_group_id
        amount　
        currency_type
        transaction_status
        description
        fabric_id
    */

    /*

        transaction_status
        1: 支払いリンク発行依頼中
        2: 支払いリンク発行済み
        3: 支払い済み
        4: キャンセル

    */

    // 送金リンク発行のリクエスト
    const submitTransaction = async () => {

        if(amount >0){
            // 送金処理 
            const transaction = {
                source_group_id:sourceGroupId,
                target_group_id:targetGroupId,
                amount:amount,
                currency_type:1,
                transaction_status:1,
                description:description,
                fabric_id:fabricId
            }

            //  ka_group_transactions に追加
            const {data,error} = await supabaseClient.from('ka_group_transactions').insert(transaction).select();
            if(data)
            {
                alert('送金リクエストを受け付けました。');
                console.log('inserted',data);
            }else{
                console.log('error',error);
            }

            // メール送信の処理はここに入れる。
        }
    }

    useEffect(()=>{
        // props.sourceUserIdから値を取得
        if(props.sourceGroupId){
            setSourceGroupId(props.sourceGroupId);
        }
        // props.targetUserIdから値を取得
        if(props.targetGroupId){
            setTargetGroupId(props.targetGroupId);
        }

        if(props.sourceUserId){
            setSourceUserId(props.sourceUserId);
        }

        if(props.targetUserId){
            setTargetUserId(props.targetUserId);
        }

        if(props.fabricId){
            setFabricId(props.fabricId);
        }

    },[props.sourceUserId,props.targetUserId,props.fabricId]);

    return (<div>
        <div className={style.payment_form_container}>

            <div className={cstyle.row}>
                <label>支払い側 Group ID:</label>
                <div>{sourceGroupId}</div>
            </div>

            <div className={cstyle.row}>
                <label>受け取り側 Group ID:</label>
                <div>{targetGroupId}</div>
            </div>

            <div className={cstyle.row}>
                <label>支払い側 User ID:</label>
                <div>{sourceUserId}</div>
            </div>

            <div className={cstyle.row}>
                <label>受け取り側 User ID:</label>
                <div>{targetUserId}</div>
            </div>


            <div className={cstyle.row}>
                <label>金額:</label>
                <input type='number' onChange={(e)=>{setAmount(Number(e.target.value))}}/>
            </div>

            <div className={cstyle.row}>
                <label>生地:</label>
                <div>{fabricId}</div>
            </div>

            <div className={cstyle.row}>
                <label>通貨の種類</label>
                <select onChange={(e)=>{setCurrencyType(Number(e.target.value))}}>
                    <option value={1}>JPY</option>
                    <option value={2}>USD</option>
                </select>
            </div>

            {/* 説明 */}
            <div className={cstyle.row}>
                <label>説明</label>
                <textarea onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>

            <div className={cstyle.btn} onClick={submitTransaction}>申請する</div>
        </div>
    </div>);
}
export default PaymentForm;