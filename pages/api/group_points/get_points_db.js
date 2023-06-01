

import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        return res.status(401).send("You are not authorized to call this API");
    }

    let supabaseServerClient = getServerSideSupabase();

    // ポイント追加
    let {data:group_point,error: group_point_error} = await supabaseServerClient.from('ka_group_points').insert({'group_id':req.body.group_id,'points':10,'initial_points':10}).select();

    if(group_point){
        return res.status(200).json({ message: 'ok' });    
    }else{
        console.log('ERROR',group_point_error);
        return res.status(400).json({ message: 'failed' });
    }
}

export default handler;