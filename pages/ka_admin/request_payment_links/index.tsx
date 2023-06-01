import style from './style.module.css'
import { useState, useEffect } from 'react';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';
import RequestPaymentLink from '../../../components/request_payment_link/request_payment_link';

const AdminRequestPaymentLinksPage = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [isAdmin,setIsAdmin] = useState<boolean>(false);
    const [transactions,setTransactions] = useState<any[]>([]);

    useEffect(()=>{
        
        if(user){
            (async()=>{
                // Admin Userかどうか確認
                console.log("user.id",user.id);
                const {data:admin_user,error:admin_user_error} = await supabaseClient.from('ka_admin_users').select().eq('user_id',user.id).single();
                if(admin_user){
                    setIsAdmin(true);

                    // ka_group_transactionsのリストを取得
                    const {data:group_transactions,error:group_transactions_error} = await supabaseClient.from('ka_group_transactions').select();
                    if(group_transactions){
                        console.log("group_transactions",group_transactions);
                        setTransactions(group_transactions);
                    }else{
                        console.log("group_transactions_error",group_transactions_error);
                    }
                }else{
                    console.log("admin_user_error",admin_user_error);
                }


        
            })();
        }

    },[user]);

    return (<>

    {isAdmin ? 
        <div>
            <h1>リクエスト</h1>
            {transactions.map((transaction)=>{
                console.log('transaction',transaction);
                return (<RequestPaymentLink key={transaction.id} transaction={transaction} />)
            })}
        </div>

    :<>Admin Only</>}
        
    </>);
}
export default AdminRequestPaymentLinksPage;