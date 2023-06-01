
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
        // group_idの取得
        let {data: user_profile} = await supabaseServerClient.from('ka_user_profile').select().eq('user_id',user.id);
        if(user_profile && user_profile.length > 0){
            let upf = user_profile[0];
            if(upf.active_group_id){
                let post_body  =  {
                    apikey: process.env.API_ROUTE_SECRET,
                    user_id:user.id,
                    group_id:upf.active_group_id
                };
                
                const host = req.headers.host || 'localhost:3000';
                const protocol = /^localhost/.test(host) ? 'http' : 'https';

                let hostname = protocol + '://' + host;
                await axios.post(hostname + '/api/group_points/consume_points_db',post_body)
                .then((d)=>{
                    console.log('💫',d);
                    return res.status(200).json({ message: 'ok' });
                }).catch((error)=>{
                    console.log('💫💫',error);
                    return res.status(400).json({ message: 'failed' });
                });
            }
        }else{
            return  res.status(400).json({ message: 'error' });
        }
      
    }else{    
        return  res.status(400).json({ message: 'not_authenticated' });
    }
}

export default handler