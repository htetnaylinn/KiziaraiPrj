import {useRef, useState,useEffect} from "react";
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import cstyle from "../../../components/css/style.module.css";

const UserAdminBankAccountPage = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const bankNameRef = useRef<HTMLInputElement>(null);
    const accountNumberRef = useRef<HTMLInputElement>(null);
    const branchCodeRef = useRef<HTMLInputElement>(null);

    /*
    ka_user_bankaccounts :
       bank_name text null,
    account_number text null,
    branch_code text null,
    account_type text null,
    user_id uuid not null,
    */

    const registerOrUpdateData = async () => {

        if(user && bankNameRef.current?.value && accountNumberRef.current?.value && branchCodeRef.current?.value){
            const { data, error } = await supabaseClient
            .from('ka_user_bankaccounts')
            .upsert({
                bank_name: bankNameRef.current?.value,
                account_number: accountNumberRef.current?.value,
                branch_code: branchCodeRef.current?.value,
                user_id: user?.id,
            }).select();

            if (error) {
                alert(error.message);
            } else {

                console.log(data);
                alert("登録しました");
            }
        }  
    }

    useEffect(() => {
        if(user){
            (async () => {
                // user idで、ka_user_bankaccounts から情報を取得し、refに格納する
                const { data, error } = await supabaseClient.from('ka_user_bankaccounts').select().eq('user_id', user?.id);

                if (error) {
                    console.log(error);
                }

                if(data){
                    console.log(data);
                    if(data.length > 0){
                        bankNameRef.current!.value = data[0].bank_name;
                        accountNumberRef.current!.value = data[0].account_number;
                        branchCodeRef.current!.value = data[0].branch_code;
                    }
                }

            })();
        }
    }, [user]);

    // 現在の銀行口座の情報を取得する

    useEffect(() => {
        if(user && bankNameRef.current?.value && accountNumberRef.current?.value && branchCodeRef.current?.value){
            (async () => {
                // user idで、ka_user_bankaccounts から情報を取得し、refに格納する
                const { data, error } = await supabaseClient.from('ka_user_bankaccounts').select().eq('user_id', user?.id);
                if(data){
                    console.log(data);
                    if(data.length > 0){
                        bankNameRef.current!.value = data[0].bank_name;
                        accountNumberRef.current!.value = data[0].account_number;
                        branchCodeRef.current!.value = data[0].branch_code;
                    }
                }
            })();
        }
    }, [user,bankNameRef.current,accountNumberRef.current,branchCodeRef.current]);


//    const accountTypeRef = useRef<HTMLInputElement>(null);


    return (<div>

        <div className={cstyle.container}>
            <div className={cstyle.row}>
                <label>銀行名</label>
                <input type="text" ref={bankNameRef} />
            </div>
            
            <div className={cstyle.row}>
                <label>支店コード</label>
                <input type="text" ref={branchCodeRef} />
            </div>

            <div className={cstyle.row}>
                <label>口座番号</label>
                <input type="text" ref={accountNumberRef} />
            </div>

            <div className={cstyle.row}>
                <div className={cstyle.btn} onClick={registerOrUpdateData}>登録/更新</div>
            </div>
        </div>

    </div>)
}
export default UserAdminBankAccountPage;