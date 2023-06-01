import style from './company_item.module.css'
import Link from 'next/link';
import {useUser,useSupabaseClient} from '@supabase/auth-helpers-react';
import { useState,useEffect } from 'react';

const CompanyItem = (props : any)=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [isFavorite,setIsFavorite] = useState(false);

    // お気に入り登録
    // ka_group_favs_companies
    // upsert group_id, user_id, company_id
    const toggleFavorite = async ()=>{

        if(user){


        let {data: user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user?.id).single();
        if(user_profile && user_profile.active_group_id){
            let group_id = user_profile.active_group_id;

            // 既に登録済みかどうかを確認
            let {data: fav_company,error:fav_company_error} = await supabaseClient.from('ka_group_favs_companies').select().eq('group_id',group_id).eq('user_id',user?.id).eq('company_id',props.company.id).single();

            if(fav_company){
                // delete
                let {data,error} = await supabaseClient.from('ka_group_favs_companies').delete().eq('group_id',group_id).eq('user_id',user?.id).eq('company_id',props.company.id);
                if(data){
                    alert('delete ok');
                    console.log('data',data);
                    setIsFavorite(false);
                }

                if(error){
                    console.log('error',error);
                }

            }else{
                // register
                let {data,error} = await supabaseClient
                .from('ka_group_favs_companies')
                .insert({'group_id':group_id,'user_id':user?.id,'company_id':props.company.id})
                .select();

                if(data){
                    alert('register ok');
                    console.log('data',data);
                    setIsFavorite(true);
                }
            
                if(error){

                    alert('register error');
                    console.log('error',error);
                }
            }
        }



        }else{
            alert('user not found');
        }


        return false;
    }


    // 
    useEffect(()=>{

        (async()=>{

            if(user){
                let {data: user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user?.id).single();
                if(user_profile && user_profile.active_group_id){
                   
                   
                    alert('profile ok');
                    let group_id = user_profile.active_group_id;
                    // 既に登録済みかどうかを確認
                    let {data:fav_fabric,error:fav_fabric_error} = await supabaseClient.from('ka_group_favs_companies').select().eq('group_id',group_id).eq('user_id',user?.id).eq('company_id',props.company.id).single();
                    console.log(fav_fabric,fav_fabric_error);
                    if(fav_fabric){
                        setIsFavorite(true);
                    }else{
                        setIsFavorite(false);
                    } 
                }


            }



           
        })();

     

    },[props,user]);


         /*
                    create view
                    public.ka_view_localized_company_profile as
                    select
                    ka_company.id,
                    ka_company_profile.lang_id,
                    ka_company_profile.company_name,
                    ka_country_master.country_name,
                    ka_company_profile.city
                    from
                    ka_company
                    left join ka_company_profile on ka_company.id = ka_company_profile.company_id
                    left join ka_country_master on ka_company_profile.country_id = ka_country_master.id;
        */
        // ka_view_localized_company_profileから取得されたデータを表示する

    return (
        <div className={style.container}>
            <Link href="/showroom/1">
            <div className={style.container}>
                <div className={style.photo_container}>
                    <div className={style.photo_inner_container}><img src='/imgs/kizi_company.jpg' /></div>
                </div>
                <div className={style.company_name}>{props.company.id}{props.company.company_name}</div>
                <div className={style.prefecture_name}>{props.company.country_name}|{props.company.city}</div>
                <div className={style.material_name}>コットン</div>
            </div>
            </Link>
            <div className={style.favorite_button} onClick={toggleFavorite}>Add fav{isFavorite ? '❤️' : '-'}</div>
        </div>
        )
}

export default CompanyItem;