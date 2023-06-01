

import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        return res.status(401).send("You are not authorized to call this API");
    }

    let supabaseServerClient = getServerSideSupabase();


    let {data:user,error: user_error} = await supabaseServerClient.from('ka_user_profile').insert({'user_id':req.body.user_id});


    if(user){
        
        res.status(200).json({ message: 'ok' });       
    }else{

        console.log('ERROR',user_error);
        res.status(400).json({ message: 'failed' });
    }




    // console.log('purchase db data',req.body.points,req.body.userid);

 

        
        //res.status(200).json({ message: 'ok' });
        ///res.send({message:'ok'});
    
}

export default handler;