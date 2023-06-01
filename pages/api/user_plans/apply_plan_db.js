/**
 *   let {data:group_role_plan,error:group_role_plan_error} = await supabaseServerClient.from('ka_group_role_plan').insert({'group_id':group_id,'role_id':role_id,'plan_id':role_plan_id,'active':true}).select().single();
 */



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

    console.log(req.body);

    // user追加
    let {data:user,error: user_error} = await supabaseServerClient.from('ka_user_profile').select().eq('user_id',req.body.user_id).single();

    if(user && user.active_group_id){

        console.log('user',user);

        let group_id = user.active_group_id;
        let role_id = req.body.role_id;
        let role_plan_id = req.body.role_plan_id;

        let {data:group_role_plan,error:group_role_plan_error} = await supabaseServerClient.from('ka_group_role_plan').insert({'group_id':group_id,'role_id':role_id,'plan_id':role_plan_id,'active':true}).select().single();    
   
        if(group_role_plan){
            console.log(group_role_plan);
            return res.status(200).json({ message: 'ok' });
        }else{
            console.log(group_role_plan_error);
            return res.status(400).json({ message: 'failed' });
        }

    }else{

        console.log('ERROR',user_error);
        return res.status(400).json({ message: 'failed' });
    }    
}

export default handler;