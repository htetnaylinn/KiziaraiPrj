import { useState,useEffect } from "react";
import style from './fabric_item.module.css';
import Link from "next/link";
import {useUser,useSupabaseClient} from '@supabase/auth-helpers-react';

const FabricItem = (props : any)=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [isFavorite,setIsFavorite] = useState(false);

    // お気に入り登録
    // ka_group_favs_fabrics
    // upsert group_id, user_id, fabric_id
    const toggleFavorite = async ()=>{
        let {data: user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user?.id).single();
        if(user_profile && user_profile.active_group_id){
            let group_id = user_profile.active_group_id;

            // 既に登録済みかどうかを確認
            let {data: fav_fabric,error:fav_fabric_error} = await supabaseClient.from('ka_group_favs_fabrics').select().eq('group_id',group_id).eq('user_id',user?.id).eq('fabric_id',props.item.id).single();
            if(fav_fabric){
                // delete
                let {data,error} = await supabaseClient.from('ka_group_favs_fabrics').delete().eq('group_id',group_id).eq('user_id',user?.id).eq('fabric_id',props.item.id);
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
                .from('ka_group_favs_fabrics')
                .insert({'group_id':group_id,'user_id':user?.id,'fabric_id':props.item.id})
                .select();

                if(data){
                    alert('register ok');
                    console.log('data',data);
                    setIsFavorite(true);
                }
            
                if(error){
                    console.log('error',error);
                }
            }
        }

        return false;
    }

    useEffect(()=>{

        (async()=>{

            if(user){
                let {data: user_profile,error:user_profile_error} = await supabaseClient.from('ka_user_profile').select().eq('user_id',user?.id).single();
                if(user_profile && user_profile.active_group_id){
                    let group_id = user_profile.active_group_id;
                    // 既に登録済みかどうかを確認
                    let {data:fav_fabric,error:fav_fabric_error} = await supabaseClient.from('ka_group_favs_fabrics').select().eq('group_id',group_id).eq('user_id',user?.id).eq('fabric_id',props.item.id).single();
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

    return (
      <div className={style.block}>
        <Link href={`/fabrics/item/${props.item.kiziarai_id}`}>
            <div className={style.block}>
                <div><img src="/imgs/sphere_mini.png" /></div>
                <div className={style.swatch}><img src="/imgs/detail_mini.jpg" /></div>
            </div>
        </Link>
        <div className={style.button} onClick={toggleFavorite}>Add favorite {isFavorite ? "❤️" : "-"}</div>
     </div>
    )
}

export default FabricItem;
