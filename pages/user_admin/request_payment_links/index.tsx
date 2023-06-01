import style from './style.module.css'
import { useState,useEffect,useRef } from 'react';
import { useSupabaseClient,useUser } from '@supabase/auth-helpers-react';
import { getTransactionStatus } from '../../../components/commons/commons';

const UserAdminRequestPaymentLinks = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [transactions,setTransactions] = useState<any[]>([]);
    const [paymentLinks,setPaymentLinks] = useState<any[]>([]);

    // ユーザーのactive_group_idにマッチするka_group_transactionsを取得
    useEffect(()=>{
        if(user){
            (async()=>{
                // group_id取得
                const {data:user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single();
                if(user_profile){
                    const {data:group_transactions,error:group_transactions_error} = await supabaseClient.from('ka_group_transactions').select().eq('target_group_id',user_profile.active_group_id);
                    if(group_transactions){
                        setTransactions(group_transactions);
                    }else{
                        console.log("group_transactions_error",group_transactions_error);
                    }

                    // payment_link取得
                    const {data:payment_links,error:payment_links_error} = await supabaseClient.from('ka_transaction_payment_links').select().eq('target_user_id',user.id);
                    if(payment_links){
                        setPaymentLinks(payment_links);
                    }else{
                        console.log("payment_links_error",payment_links_error);
                    }

                }else{
                    console.log("user_profile_error",user_profile_error);
                }
            })();
        }    
    },[user]);

    return (<div>
        <h1>リスト</h1>
            {transactions.map((transaction)=>{
                return (<div key={transaction.id}>
                    <div>{transaction.id} / {transaction.source_group_id} / {transaction.source_user_id} / {transaction.currency_type} / {transaction.amount} / {getTransactionStatus(transaction.transaction_status)}</div>
                </div>)
            })}
            
            <h1>発行済み支払いリンク</h1>
            {paymentLinks.map((paymentLink)=>{
                return (<div key={paymentLink.id}>
                    <div>{paymentLink.id} / {paymentLink.target_user_id} / {paymentLink.payment_link}</div>
                </div>)
            })
        }
    </div>);
}
export default UserAdminRequestPaymentLinks