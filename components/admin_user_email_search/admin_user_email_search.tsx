import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";
import style from "../css/style.module.css"
import axios from "axios";

// Props setUserEmail
const AdminUserEmailSearch = (props : any) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const [userEmail,setUserEmail] = useState("");
    const [userId,setUserId] = useState("");

    const supabaseClient = useSupabaseClient();

    const searchUser = async () => {

        console.log('searchUser');

        const email = emailRef.current?.value;
        if(!email) return;

     
         await axios.post("/api/ka_admin/get_user",{"email":email}).then((d)=>{
            

            if(d && d.data && d.data.user){
                let usr = d.data.user;
                props.setUserEmail(usr.email);
                setUserEmail(usr.email);
                
                props.setUserId(usr.id);
                setUserId(usr.id);
            }else{
                alert('ユーザーが見つかりませんでした。');
            }

         }).catch((error)=>{

            alert('error');
            console.log(error);

         });
        
    }
    
    return (<>
        <div>
            <div className={style.container}>
                <label htmlFor="email">Email</label>
                <input type="text" ref={emailRef} />
                <div className={style.btn} onClick={searchUser}>ユーザーを検索</div>
            </div>
            <div className={style.container}>
                <div>ユーザーID</div>
                <div>{userId}</div>
                <div>ユーザーEmail</div>
                <div>{userEmail}</div>
            </div>

        </div>
    </>)

}

export default AdminUserEmailSearch