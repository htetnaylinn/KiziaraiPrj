import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect,useState } from "react";
import cstyle from '../../../components/css/style.module.css';
import Link from "next/link";

const UserAdminBuyerTop = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    return (<>
        <h1>Buyyer Top Menu</h1>
        <Link href="/user_plans/"><div className={cstyle.btn}>プラン選択</div></Link>
        <Link href="/user_admin/bookmarks/buyer/"><div className={cstyle.btn}>Favの一覧</div></Link>
    </>);
}

export default UserAdminBuyerTop