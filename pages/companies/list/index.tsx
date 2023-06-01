import style from './companies_list.module.css'
import { useState,useEffect } from 'react'
import CompanyItem from '../../../components/company_item/company_item';
import SideMenu from '../../../components/side_menu/side_menu';
import BookmarkInfo from '../../../components/bookmark_info/bookmark_info';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react'

const Companies = ()=>{

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [companies, setCompanies] = useState<any[]>([]);

    useEffect(()=>{
        (async ()=>{
            if(user){
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
                // ka_view_localized_company_profileからデータを取得する
                let {data, error} = await supabaseClient.from('ka_view_localized_company_profile').select().eq('lang_id',1);
                if(data){
                    alert('data');
                    setCompanies(data);
                }else{
                    console.log(error);
                }
            }
        })();
    },[]);

    return (<><div className={style.all_container}>
            <div className={style.left_container}>
                <SideMenu isBgWhite={true}/>
            </div>
        
            <div className={style.right_container}>
                <div className={style.title_container}>
                    <img src="/imgs/logo.png" />
                </div>
                <div>
                    <div className={style.search_filter_row}>
                        <div className={style.search_filter_title}>産地絞り込み</div>
                        <div className={style.search_elements}>
                            <div className={style.search_element}>富山</div>
                            <div className={style.search_element}>山梨</div>
                        </div>
                    </div>
                    <div className={style.search_filter_row}>
                        <div className={style.search_filter_title}>専門絞り込み</div>
                        <div className={style.search_elements}>
                            <div className={style.search_element}>コットン</div>
                            <div className={style.search_element}>羊毛</div>
                        </div>
                    </div>
                </div>
                <div className={style.messages_container}>
                    { 
                        companies.map((company)=>{
                            return (<CompanyItem key={company.id} company={company}/>)
                        })
                    }
                </div>
            </div>

            <BookmarkInfo />
        </div></>
    );
}

export default Companies;