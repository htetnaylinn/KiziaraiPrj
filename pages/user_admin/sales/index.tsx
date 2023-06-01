import style from './style.module.css'
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect,useState } from "react";
import UserProfileSimpleDisplay from '../../../components/user_profile/simple_display';
import cstyle from '../../../components/css/style.module.css';

const UserAdminSalesTop = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [paymentLinksSales,setPaymentLinksSales] = useState<any[]>([]);
    const [totalSales,setTotalSales] = useState<number>(0);

    /*
    
    ka_view_paymentlinks_sales

    */

    /*

    通貨ごとの集計
    期間ごとの集計
     
    */

    useEffect(()=>{

        (async ()=>{
            if(user){
                // group のidを取得
                const {data:user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single();
                if(user_profile){

                    const { data, error } = await supabaseClient
                        .from('ka_view_paymentlinks_sales')
                        .select()
                        .eq('target_group_id',user_profile.active_group_id)
                        .order('created_at', { ascending: false });

                    if(data && data.length > 0){
                        setPaymentLinksSales(data);
                        // 合計金額を計算
                        let total = 0;
                        data.forEach((d:any)=>{
                            total += d.amount;
                        });
                        setTotalSales(total);
                    }
                }
            }
        })();
    },[user]);

    return (<div>
        <UserProfileSimpleDisplay />
        <h2>売上</h2>

        <div className={cstyle.sales_row}>
            <div className={cstyle.sales_column}>合計</div>
            <div className={cstyle.sales_column}>{totalSales}</div>
        </div>

        <div className={style.sales_links}>
            {paymentLinksSales.map((sales:any)=>{
                return (<div key={sales.id} className={style.sales_row}>
                    <div className={style.sales_link_column}>{sales.source_group_id}</div>
                    <div className={style.sales_link_column}>{sales.source_user_id}</div>
                    <div className={style.sales_link_column}>{sales.description}</div>
                    <div className={style.sales_link_column}>{sales.amount}</div>
                    <div className={style.sales_link_column}>{sales.created_at}</div>
                </div>)
            })}
        </div>
    </div>)
}

export default UserAdminSalesTop;