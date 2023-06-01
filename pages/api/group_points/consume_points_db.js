

import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{

    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    if(req.body.apikey !== process.env.API_ROUTE_SECRET){
        return res.status(401).send("You are not authorized to call this API");
    }

    let supabaseServerClient = getServerSideSupabase();
    // ポイントの取得
    // 古いものからゼロポイントより大きいものを取得する。
    let {data:tmp_group_point,error: tmp_group_point_error} = await supabaseServerClient.from('ka_group_points').select().eq('group_id',req.body.group_id).order('created_at', {ascending: true}).gt('points',0);
    if(tmp_group_point && tmp_group_point.length > 0){
        let tmp_gp = tmp_group_point[0];
        if(tmp_gp.points > 0){
            // ポイントを減らす
            let {data:group_point,error: group_point_error} = await supabaseServerClient.from('ka_group_points').update({'points':tmp_gp.points - 1}).eq('group_id',req.body.group_id).select();
            
            if(group_point){
                let {data,error} = await supabaseServerClient.from('ka_group_consume_points_history').insert({'group_id':req.body.group_id,'points':1,'user_id':req.body.user_id,'description':'test_consume','points_id':tmp_gp.id}).select();
                console.log(data,error);

                return res.status(200).json({ message: 'ok' }); 
            }else{
                console.log('ERROR 0',group_point_error);
                return res.status(400).json({ message: 'failed' });
            }
        }else{
            console.log('ERROR 1','no points');
            return res.status(400).json({ message: 'failed' });
        }
    }else{
        console.log('ERROR 2',tmp_group_point_error);
        return res.status(400).json({ message: 'failed' });
    }
}

export default handler;