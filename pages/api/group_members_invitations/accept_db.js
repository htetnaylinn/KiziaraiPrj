
import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        return res.status(401).send("You are not authorized to call this API");
    }

    let supabaseServerClient = getServerSideSupabase();

    // console.log(req.body);
    // ka_group_members_invitationsのstatusを2にする
    let {data:group_members_invitations,error: group_members_invitations_error} = await supabaseServerClient.from('ka_group_member_waitinglist').update({'status':2}).eq('id',req.body.id).select().single();
    if(group_members_invitations && group_members_invitations.target_user_email){
        console.log(group_members_invitations);
        console.log('target_user_email',group_members_invitations.target_user_email);
        //group_members_invitations.target_user_email で、ka_view_user_emailsを検索する
        let {data:ka_view_user_emails,error: ka_view_user_emails_error} = await supabaseServerClient.from('ka_user_profile').select().eq('email',group_members_invitations.target_user_email);
        if(ka_view_user_emails && ka_view_user_emails.length>0){
            let user_id = ka_view_user_emails[0].user_id;
            console.log('user_id',user_id);

            //ka_group_membersに追加する
            let {data:group_members,error: group_members_error} = await supabaseServerClient.from('ka_user_group_members').insert({'group_id':group_members_invitations.group_id,'user_id':user_id}).select();
            if(group_members){
                console.log(group_members);
                return res.status(200).json({ message: 'ok' });
            }else{
                console.log(group_members_error);
                return res.status(400).json({ message: 'ng' });
            }
        }else{
            console.log('ka_view_user_emails_error',ka_view_user_emails_error);
            return res.status(400).json({ message: 'ng' });
        } 
    }else{
        console.log(group_members_invitations_error);
        return res.status(400).json({ message: 'failed' });
    }    
}

export default handler;