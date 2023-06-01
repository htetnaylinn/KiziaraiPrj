import style from '../../components/css/style.module.css'
import { useEffect, useState } from 'react'
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { Role ,RolePlan, getRoleName, getRolePlanName} from '../../components/commons/commons';
import axios from 'axios';

const UserPlans = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [isCheckedRole,setIsCheckedRole] = useState(false);
    const [selectedRole,setSelectedRole] = useState<number>(0);

    const [isCheckedPlan,setIsCheckedPlan] = useState(false);
    const [selectedPlan,setSelectedPlan] = useState<number>(0);

    const [userEmail,setUserEmail] = useState<string>("");

    const [activeRole,setActiveRole] = useState<string>("");
    const [activePlan,setActivePlan] = useState<string>("");

    // 申し込みボタンクリック
    const applyPlan = async () => {
        // プラン申し込み処理

        console.log('Role, Plan',selectedRole,selectedPlan,getRoleName(selectedRole),getRolePlanName(selectedPlan));

        let post_data = {
            role_id:selectedRole,
            role_plan_id:selectedPlan
        }

        await axios.post("/api/user_plans/apply_plan",post_data).then((d)=>{
            console.log('豚豚豚',d);
            alert('プランを申し込みました。');
        }).catch((error)=>{
            alert('error');
            console.log(error);
        });
    }

    useEffect(()=>{
        (async ()=>{
            if(user){
                let {data:user_email,error} = await supabaseClient.from('ka_user_profile').select('*').eq('user_id',user.id).single();
                if(user_email){
                    setUserEmail(user_email.email);
                }else{
                    console.log('user profile error',error);
                }

                let {data:user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select('*').eq('user_id',user.id).single();
                if(user_profile){
                    console.log(user_profile);
                    let {data:group_role_plan,error:group_role_plan_error} = await supabaseClient.from('ka_group_role_plan').select().eq('group_id',user_profile.active_group_id).single();
                    if(group_role_plan){

                        console.log('active Role Plan',group_role_plan);

                        setActiveRole(getRoleName(group_role_plan.role_id));
                        setActivePlan(getRolePlanName(group_role_plan.plan_id));
    
                    }else{
                        console.log(group_role_plan_error);
                    }
                }
            }
        })();
    },[user])


    /**
    * タイプの選択 > プランの選択 >　プランの申し込み
    */
    return (<>
        <div>User: {userEmail}, {activeRole} / {activePlan}</div>

        {!isCheckedRole ? <div className={style.all_container}>
            <div className={style.flex_container}>
                <div className={style.flex_item_w500}>
               
                        <div className={style.btn} onClick={()=>{setIsCheckedRole(true);setSelectedRole(Role.Supplier);}}>Supplier</div>
                        <div className={style.btn} onClick={()=>{setIsCheckedRole(true);setSelectedRole(Role.Buyer);}}>Buyer</div>
                        <div className={style.btn} onClick={()=>{setIsCheckedRole(true);setSelectedRole(Role.Agent);}}>Agent</div>
              
                </div>
            </div>
        </div> :<></>}

        { // プランの選択 Supplier
        isCheckedRole && !isCheckedPlan && selectedRole == Role.Supplier ? <div className={style.all_container}>
            <div className={style.flex_container}>
                <div className={style.flex_item_w500}>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.SupplierAgency);}}>Agency</div>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.SupplierSurplus);}}>Surplus</div>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.SupplierSustainable);}}>Sustainable</div>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.SupplierEconomy);}}>Economy</div>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.SupplierStandard);}}>Standard</div>
                </div>
            </div>
        </div> : <></>}

        { // プランの選択 Buyer
        isCheckedRole && !isCheckedPlan && selectedRole == Role.Buyer ? <div className={style.all_container}>
            <div className={style.flex_container}>
                <div className={style.flex_item_w500}>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.BuyerFree);}}>FREE</div>
                    <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.BuyerSubscription);}}>Subscription</div>
                </div>
            </div>
        </div> : <></>}

        { // プランの選択 Agent
            isCheckedRole && !isCheckedPlan && selectedRole == Role.Agent ? <div className={style.all_container}>
                <div className={style.flex_container}>
                    <div className={style.flex_item_w500}>
                        <div className={style.btn} onClick={()=>{setIsCheckedPlan(true);setSelectedPlan(RolePlan.AgentFree);}}>FREE</div>
                    </div>
                </div>
            </div> :
            <></>
        }
        
        { // プランの申し込み
            isCheckedRole && isCheckedPlan ?
                <div className={style.all_container}>
                    <div className={style.flex_container}>
                        <div className={style.flex_item_w500}>
                            <div>種別:  {getRoleName(selectedRole)}</div>
                            <div>プラン:{getRolePlanName(selectedPlan)}</div>
                            <div className={style.btn} onClick={applyPlan}>申し込み</div>
                        </div>
                    </div>
                </div>
            :
            <></>
        }
    </>)
}

export default UserPlans