

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

        // ka_view_company_group_user
        const host = req.headers.host || 'localhost:3000';
        const protocol = /^localhost/.test(host) ? 'http' : 'https';

        let {data,error} = await supabaseServerClient.from('ka_view_user_permissions').select('*').eq('user_id',user.id);
        if(error){
            console.log('💫💫',error);
           // return res.status(400).json({ message: 'failed' });
        }

        let fabric_id = req.body.fabric_id;
        let user_id   = user.id;
        let role_id   = null;

        if(data && data.length > 0)
        {
            let tmp_data = data[0];
            if(tmp_data.role_id){
                role_id = tmp_data.role_id;
            }
        }

        let {data:pv_data,error:pv_error} =  await supabaseServerClient.from('ka_fabrics_pv').insert([{fabric_id,user_id,role_id}]).select();
        if(pv_error){
            console.log('💫💫',pv_error);
            return res.status(400).json({ message: 'failed' });
        }

        return res.status(200).json({ message: 'success' });

    }else{    
        console.log('ot_authenticated');
        return  res.status(400).json({ message: 'not_authenticated' });
    }
}

export default handler