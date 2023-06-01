import style from './style.module.css'
import { useState, useEffect } from 'react';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';
import TeamInfoAdmin from '../../../components/user_admin/group/team_info_admin';
import UserProfileSimpleDisplay from '../../../components/user_profile/simple_display';

const UserAdminGroupPage = () => {

    const [members, setMembers] = useState<any[]>([]);

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    /**
     ka_view_group_members_with_adminflg
    */

    useEffect(() => {

        // view はキャッシュ？
        (async () => {
            const { data, error } = await supabaseClient
                .from('ka_view_group_members_with_adminflg')
                //.from('ka_user_group_members')
                //.from('ka_user_group_admin')
                .select();

            if (error) {
                console.log(error)
            } else {
                if(data){
                    console.log(data);
                    setMembers(data);
                }
            }
        })();
        
    },[user]);



    return (<>
    <UserProfileSimpleDisplay />
        <div className={style.container}>
            <h1>Group Members</h1>
            {members.map((member) => (
                <div key={member.user_id}>
                    <div>{member.user_id}</div>
                </div>
            ))}
        </div>

      
        <div className={style.container}>
           {/* チームにメンバーを招待する */}
           <TeamInfoAdmin />
           </div>
    </>);
}
export default UserAdminGroupPage;
