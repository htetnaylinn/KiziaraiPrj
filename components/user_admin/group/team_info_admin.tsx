import style from './style.module.css'
import { useEffect,useState,useRef } from "react";
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';

const GroupInfoAdmin = ()=>{

    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const [groupId,setGroupId] = useState<number|null>(null);
    const [waitingListMembers,setWaitingListMembers] = useState<any[]>([]);
    const userEmailRef = useRef<HTMLInputElement>(null);

    // メンバー待機リストに追加する
    // 1 --- 招待中, 2 --- 承認済み, 3 --- キャンセル
    const registerMember = async ()=>{

        if(user && userEmailRef.current && userEmailRef.current.value){
            const email = userEmailRef.current.value;
            const { data, error } = await supabaseClient
                .from('ka_group_member_waitinglist')
                .insert(
                    { group_id:groupId,admin_user_email:user.email,target_user_email:email,status:1}
                );
            if(error){
                console.log(error);
                alert('ng');
            }
            else{
                console.log(data);
                alert('招待リストに追加しました');
            }

            // { group_id:groupId,admin_user_id: user.id ,admin_user_email:user.email,target_user_email:email,status:1} をログに表示
            console.log({ group_id:groupId,admin_user_email:user.email,target_user_email:email,status:1});
        }
    }

    

    useEffect(()=>{
        (async ()=>{

            if(user){
                const {data:user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user.id).single();
                if(user_profile && user_profile.active_group_id){
                    setGroupId(user_profile.active_group_id);
                }

                //ka_user_group_admin から　user_id が user.id と一致するものを取得
                const {data:group_admin,error:group_admin_error} = await supabaseClient.from('ka_user_group_admin').select().eq('user_id',user.id).single();
                // console.log('AAA ka_user_group_admin',group_admin,group_admin_error);

                // waiting list membersの取得
                const { data, error } = await supabaseClient.from('ka_group_member_waitinglist').select();
                if(error){
                    console.log(error);
                }else{
                    setWaitingListMembers(data);
                }
            }
        })();
    },[user]);

    return (<div className={style.block}>

        <div className={style.block}>
            {/* 招待済みのメンバー一覧 */}
            {waitingListMembers.map((member) => {
                return (<div key={member.id}>
                    <div>{member.id}|{member.target_user_email} <div>キャンセル</div></div>
                </div>);
                })
            }
        </div>

        <div className={style.block}>
            {/* 招待済みのメンバー一覧 */}
            <div className={style.title}>Add a new member</div>
            <div>Email:</div>
            <input type="email" defaultValue="" ref={userEmailRef} className={style.email_input} />
            <div onClick={registerMember} className={style.btn}>add invitation list</div>
        </div>
    </div>);
}
export default GroupInfoAdmin;
                    