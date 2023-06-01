/*

    /
      - Supplier (販売者)
      - Buyer (購入者)
      - アイテムの番号
      - 金額
    /

    /  管理人の画面:
       
       上記の発行情報を管理する画面
    

    /
*/

import { useState, useEffect } from 'react';
import PaymentForm from '../../../components/payment_form/payment_form';

import { useUser,useSupabaseClient, SupabaseClient } from '@supabase/auth-helpers-react';

const PaymentTest = () => {

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const [sourceGroupId, setSourceGroupId] = useState<string>("");
  const [targetGroupId, setTargetGroupId] = useState<string>("");
  const [fabricId, setFabricId] = useState<number>(3);

  const [sourceUserId, setSourceUserId] = useState<string>("");
  const [targetUserId, setTargetUserId] = useState<string>("");

  useEffect(() => {
    (async ()=>{
        if(user){
            
            // idからgroup_idを取得する
            const {data:user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single();
            
            if(user_profile){
              setTargetUserId(user_profile.user_id)
              console.log(user_profile);
              if(user_profile.active_group_id){
                  console.log("active_group_id",user_profile.active_group_id);
                  setTargetGroupId(user_profile.active_group_id);
              }
            }else{
                  console.log("user_group_error",user_profile_error)
            }

            // 請求先ユーザIDからgroup_idを取得する
            let source_user_id = "489f38fb-d6d1-49ae-8444-91c691be932b";
            const {data:source_user,error:source_user_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',source_user_id).single();
            if(source_user){
                setSourceUserId(source_user.user_id);
                if(source_user.active_group_id){
                    console.log("source_user.active_group_id",source_user.active_group_id);
                    setSourceGroupId(source_user.active_group_id);
                }
            }else{
                console.log("source_user_group_error",source_user_error)
            }
            setFabricId(3);
        }
    })();

  }, [user]);

  return (<div>
    <PaymentForm sourceGroupId={sourceGroupId} targetGroupId={targetGroupId} sourceUserId={sourceUserId} targetUserId={targetUserId} fabricId={fabricId}/>
  </div>)
}

export default PaymentTest;