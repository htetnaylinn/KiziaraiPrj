

import axios from "axios";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
    })

    const { data: { user }}    = await supabaseServerClient.auth.getUser()
    const { data: { session }} = await supabaseServerClient.auth.getSession()
   
    if(!!session && !!user){

        // ka_user_profile
        // ka_user_group
        // ka_user_group_admin
        // ka_user_group_member

        let user_id = req.body.user_id;
        const { data : user_profile,error : user_profile_error}           = await supabaseServerClient.from('ka_user_profile').delete().eq('user_id',user_id);

        // TODO:
        // ka_user_group_adminからadminになっているグループを取得
        const { data : user_group_admin,error : user_group_admin_error}   = await supabaseServerClient.from('ka_user_group_admin').delete().eq('user_id',user_id);

        const { data : user_group,error : user_group_error}               = await supabaseServerClient.from('ka_user_group').delete().eq('user_id',user_id);
        const { data : user_group_member,error : user_group_member_error} = await supabaseServerClient.from('ka_user_group_member').delete().eq('user_id',user_id);
     
        console.log('💫 delete user 💫',user_profile,user_group,user_group_admin,user_group_member);
        /*
        let post_body  =  {
            apikey: process.env.API_ROUTE_SECRET,
            user_id:user.id,
        };

       
        const host = req.headers.host || 'localhost:3000';
        const protocol = /^localhost/.test(host) ? 'http' : 'https';
        let hostname = protocol + '://' + host;



        await axios.post(hostname + '/api/user_profile/create_db',post_body)
        .then((d)=>{
            console.log('💫',d);
            return res.status(200).json({ message: 'ok' });
        }).catch((error)=>{
            console.log('💫💫',error);
            return res.status(400).json({ message: 'failed' });
        });*/




    }else{    
        return  res.status(400).json({ message: 'not_authenticated' });
    }
}

export default handler