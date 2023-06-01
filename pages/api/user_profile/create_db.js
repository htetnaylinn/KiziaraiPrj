

import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        return res.status(401).send("You are not authorized to call this API");
    }


    // ka_user_profile
    // ka_user_group
    // ka_user_group_admin
    // ka_user_group_member

    let supabaseServerClient = getServerSideSupabase();
    // user追加
    let {data:user,error: user_error} = await supabaseServerClient.from('ka_user_profile').upsert({'user_id':req.body.user_id,'email':req.body.email}).select();
    if(user){

        // group追加
        let {data:user_group,error: user_group_error} = await supabaseServerClient.from('ka_user_group').insert({'group_name':'defalut'}).select();
        if(user_group && user_group.length > 0){

            console.log('user_group',user_group);
            let {data:user_group_admin, error: user_group_admin_error}  = await supabaseServerClient.from('ka_user_group_admin').upsert({'group_id':user_group[0].id ,'user_id':req.body.user_id}).select();
            let {data:user_group_member,error: user_group_member_error} = await supabaseServerClient.from('ka_user_group_members').upsert({'group_id':user_group[0].id ,'user_id':req.body.user_id}).select();
            let {data:update_data,error: update_error} = await supabaseServerClient.from('ka_user_profile').update({'active_group_id':user_group[0].id}).eq('user_id',req.body.user_id);

            console.log('user_group_admin',user_group_admin);
            console.log('user_group_member',user_group_member);
            console.log('update_error',update_data,update_error);

            return res.status(200).json({ message: 'ok' });    
        }else{
            console.log('user group error',user_group_error);
            return res.status(400).json({ message: 'failed' });
        }        
   
    }else{

        console.log('ERROR',user_error);
        return res.status(400).json({ message: 'failed' });
    }    
}

export default handler;