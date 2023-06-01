import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect,useState } from "react";
import cstyle from '../../../components/css/style.module.css';
import Link from "next/link";

const UserAdminAgentTop = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    return (<>
        <h1>Buyyer Top Menu</h1>
        <Link href="/user_plans/"><div className={cstyle.btn}>プラン選択</div></Link>
        <div className={cstyle.btn}>-Favの一覧</div>
    </>);
}

export default UserAdminAgentTop