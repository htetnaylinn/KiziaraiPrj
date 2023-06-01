

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

    const { data: { user }}    = await supabaseServerClient.auth.getUser();
    const { data: { session }} = await supabaseServerClient.auth.getSession();
   

    if(!!session && !!user){

        console.log('🔥',user);

        // Admin以外は弾く
        if(user.email != 'hirotaka.aseishi@gmail.com'){
            return res.status(400).json({ message: 'failed' });
        }

        const host = req.headers.host || 'localhost:3000';
        const protocol = /^localhost/.test(host) ? 'http' : 'https';
        let hostname = protocol + '://' + host;

        let post_body  =  {email:req.body.email,apikey: process.env.API_ROUTE_SECRET};
        await axios.post(hostname + '/api/ka_admin/get_user_db',post_body)
        .then((d)=>{
            console.log('💫----',d.data);
            return res.status(200).json({ user: d.data.data });
        }).catch((error)=>{
            console.log('💫💫',error);
            return res.status(400).json({ message: 'failed' });
        });

    }else{    
        console.log('ot_authenticated');
        return  res.status(400).json({ message: 'not_authenticated' });
    }
}

export default handler