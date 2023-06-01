import style from './bookmarks.module.css'
import SideMenu from '../../components/side_menu/side_menu';
import BookmarkFolderRow from '../../components/bookmark_folder_row/bookmark_folder_row';
import { useState } from 'react';
import { useEffect } from 'react';
import BookmarkAddItemFabric from '../../components/bookmark_add_item_fabric/bookmark_add_item_fabric';
import BookmarkItemFabric from '../../components/bookmark_item_fabric/bookmark_item_fabric';
import BookmarkItemCompany from '../../components/bookmark_item_company/bookmark_item_company';
import BookmarkItemSamplesheet from '../../components/bookmark_item_samplesheet/bookmark_item_samplesheet';

const Bookmark = ()=>{

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

    return (<div className={style.all_container}>
            <div className={style.left_container}>
                <SideMenu isBgWhite={true}/>
            </div>
            <div className={style.right_container}>
                <div className={style.tab_container}>
                    <div className={style.tab_btn}>生地</div>
                    <div className={style.tab_btn}>会社</div>
                    <div className={style.tab_btn}>サンプルシート</div>
                </div>
                <div className={style.contents_container}>
                    <div className={style.contents_left_container}>
                        <div className={style.add_folder_container}>
                            <div className={style.add_folder_btn}>フォルダを追加する</div>
                        </div>
                        <div className={style.folder_list}>
                            {folders.map((d)=>
                            {
                                return <BookmarkFolderRow />
                            })}

                        </div>
                    </div>
                    <div className={style.contents_right_container}>
                        <div className={style.header_info_container}>
                        <img src='/imgs/folder.svg' className={style.bookmark_folder} />
                        <div className={style.folder_title}>春展示会</div>
                        <div className={style.created_at}>2023/1/13</div>
                        </div>

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
                                items.map((d)=>{
                                    return (<BookmarkItemSamplesheet/>)
                                })
                            : <></>}


                        </div>
                        
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

export default Bookmark;