import cstyle from '../../../components/css/style.module.css';
import { useState,useEffect } from 'react';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';

const UserAdminFavsPage = () => {

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [favFabrics,setFavFabrics] = useState<any[]>([]);
    const [favCompanies,setFavCompanies] = useState<any[]>([]);

    // Todo, Group  のプロフィールか、会社のプロフィールか、どちらかを表示する
    useEffect(() => {
        if(user){
            (async () => {
                //  会社のfavs
                let { data: favs_comapnies, error:favs_companies_error } = await supabaseClient.from('ka_view_group_favs_companies').select().eq('user_id', user?.id);
                if(favs_companies_error){
                    console.log(favs_companies_error);
                }
                if(favs_comapnies){
                    console.log(favs_comapnies);
                    setFavCompanies(favs_comapnies);
                }
                //  ファブリックのfavs
                let { data: favs_fabrics, error:favs_fabrics_error } = await supabaseClient.from('ka_view_group_favs_fabrics').select().eq('user_id', user?.id);
                if(favs_fabrics_error){
                    console.log(favs_fabrics_error);
                }
                if(favs_fabrics){
                    console.log(favs_fabrics);
                    setFavFabrics(favs_fabrics);
                }
            })();
        }
    },[user]);

    
    return (<>
        <div className={cstyle.container}>
            <h1>お気に入りされた履歴</h1>
            <div className={cstyle.row}>
                <h2>会社</h2>
                {favCompanies.map((favCompany) => {
                    return (
                        <div className={cstyle.row}>    
                            <h4><b>{favCompany.group_id}</b></h4>
                        </div>
                    )
                })}
            </div>
            <div className={cstyle.row}>
                <h2>生地</h2>
                {favFabrics.map((favFabric) => {
                    return (
                        <div className={cstyle.row}>
                            <h4><b>{favFabric.group_id}</b></h4>
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
}
export default UserAdminFavsPage