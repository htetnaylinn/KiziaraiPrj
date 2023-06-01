
import style from "../../../components/css/style.module.css";
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";
import AdminUserEmailSearch from "../../../components/admin_user_email_search/admin_user_email_search";
import {useState, useRef } from "react";
import axios from "axios";

// Making Team Page
// Emailでユーザーを検索しチームを生成する
const KAAdminTeam = () => {

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const emailRef = useRef<HTMLInputElement>(null);
    const [userEmail,setUserEmail] = useState("");
    const [userId,setUserId] = useState("");


    const deleteUser = async () => {
        //        await axios.post("/api/ka_admin/delete_user",{"user_id":userId})

    }
    

    return (<>
        <AdminUserEmailSearch setUserEmail={setUserEmail} setUserId={setUserId} />

        <p>----</p>
        
        {userEmail ?
        <div className={style.container}>
        <div className={style.btn} onClick={deleteUser}>ユーザーデータの削除</div>
      </div> : <> </>}

    </>)
}
export default KAAdminTeam
