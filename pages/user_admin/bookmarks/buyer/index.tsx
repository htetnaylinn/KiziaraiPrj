import style from './style.module.css'
import { useUser,useSupabaseClient } from "@supabase/auth-helpers-react";
import SideMenu from '../../../../components/side_menu/side_menu';
import BookmarkFolderRow from '../../../../components/bookmark_folder_row/bookmark_folder_row';
import { useState } from 'react';
import { useEffect } from 'react';
import BookmarkAddItemFabric from '../../../../components/bookmark_add_item_fabric/bookmark_add_item_fabric';
import BookmarkItemFabric from '../../../../components/bookmark_item_fabric/bookmark_item_fabric';
import BookmarkItemCompany from '../../../../components/bookmark_item_company/bookmark_item_company';
import BookmarkSampleSheet
 from '../../../../components/bookmark_samplesheet/bookmark_samplesheet';
const UserAdminBookmarksBuyerTop = ()=>{

    const [folders,setFolders] = useState<any[]>([]);
    const [items,setItems] = useState<any[]>([]);

    const [isTabFabricSelected,setIsFabricSelected]           = useState(false);
    const [isTabCompanySelected,setIsCompanySelected]         = useState(false);
    const [isTabSampleSheetSelected,setIsSampleSheetSelected] = useState(true);

    const [isAddMenuOpen,setIsAddMenuOpen] = useState(false);

    useEffect(()=>{
        let list = ["","","","",""];
        setFolders(list);

        let list_items = ["","","","",""];
        setItems(list_items);
    },[]);

    const tabSampleSheet = ()=>{

        alert('tabSampleSheet');
        setIsFabricSelected(false);
        setIsCompanySelected(false);
        setIsSampleSheetSelected(true);
    }

    return (<div className={style.all_container}>
            <div className={style.left_container}>
                <SideMenu isBgWhite={true}/>
            </div>
            <div className={style.right_container}>
                <div className={style.tab_container}>
                    <div className={style.tab_btn}>生地</div>
                    <div className={style.tab_btn}>会社</div>
                    <div className={style.tab_btn} onClick={tabSampleSheet}>サンプルシート</div>
                </div>
                <div className={style.contents_container}>
                    <div className={style.bookmark_list_container}>
                        { isTabFabricSelected ?
                            items.map((d)=>{
                                return (<BookmarkItemFabric />)
                            })
                        : <></>}

                        { isTabCompanySelected ?
                            items.map((d)=>{
                                return (<BookmarkItemCompany/>)
                            })
                        : <></>}

                        { isTabSampleSheetSelected ?
                       
                            <BookmarkSampleSheet />
                        
                        : <></>}

                    </div>  
                
                </div>
            </div>

            {isAddMenuOpen ?
            <div className={style.menu_add_item}>
                <BookmarkAddItemFabric />
            </div> : 
            <></>}
    </div>);
}

export default UserAdminBookmarksBuyerTop