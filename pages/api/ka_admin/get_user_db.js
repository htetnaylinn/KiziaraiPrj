

import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    console.log('call 1');

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    console.log('call 2');

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        console.log("You are not authorized to call this API");
        return res.status(401).send("You are not authorized to call this API");
    }

    console.log('call 3');

    // ka_user_profile
    // ka_user_group
    // ka_user_group_admin
    // ka_user_group_member

    let supabaseServerClient = getServerSideSupabase();

    // console.log('call 4');
    // user追加
    let {data:user,error} = await supabaseServerClient.from('ka_user_profile').select('*').eq('email',req.body.email);
   // let {data:user,error} = await supabaseServerClient.from('ka_view_user_emails').select('*');

    console.log('------',user,error);

    if(user && user.length > 0){

        console.log('🐈🐈',user);
        return res.status(200).json({ data: user[0] });    
     
    }else{

        console.log('ERROR',error);
        return res.status(400).json({ message: 'failed' });
    }    
}

export default handler;