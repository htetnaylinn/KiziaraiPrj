
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

        let post_body  =  {
            apikey: process.env.API_ROUTE_SECRET,
            user_id:user.id,
            role_id:req.body.role_id,
            role_plan_id:req.body.role_plan_id
        };

        const host = req.headers.host || 'localhost:3000';
        const protocol = /^localhost/.test(host) ? 'http' : 'https';

        let hostname = protocol + '://' + host;
        await axios.post(hostname + '/api/user_plans/apply_plan_db',post_body)
        .then((d)=>{
            console.log('💫',d);
            return res.status(200).json({ message: 'ok' });
        }).catch((error)=>{
            console.log('💫💫',error);
            return res.status(400).json({ message: 'failed' });
        });

    }else{    
        return  res.status(400).json({ message: 'not_authenticated' });
    }
}

export default handler;