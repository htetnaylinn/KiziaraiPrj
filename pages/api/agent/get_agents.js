import { getServerSideSupabase } from "../../../utils/supabase"

const handler = async (req, res) =>{
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    let supabaseServerClient = getServerSideSupabase();
    // TODO: agentのviewから取得
    let {data:users,error} = await supabaseServerClient.from('ka_user_profile').select('*');
    if(users && users.length > 0){
        console.log('🐈🐈',users);
        return res.status(200).json({ data: users });    
    }else{
        console.log('ERROR',error);
        return res.status(400).json({ message: 'failed' });
    }    
}

export default handler