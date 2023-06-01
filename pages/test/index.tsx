import { useEffect,useState } from "react"
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";

const TestPermissions = ()=>{

    const supabaseClient = useSupabaseClient();
    const user     = useUser();

     useEffect(()=>{
        (async ()=>{
            

            console.log('test permissions');

            let {data,error} = await supabaseClient.from('ka_test_permissions').select();
            console.log('test row 1',data,error)

            let {data : data2,error :error2} = await supabaseClient.from('ka_test_table_permissions').select();
            console.log('test table 2',data2,error2)



        })();
     },[user])

    return (<div>
        <div>test permissions</div>

    </div>)
}
export default TestPermissions