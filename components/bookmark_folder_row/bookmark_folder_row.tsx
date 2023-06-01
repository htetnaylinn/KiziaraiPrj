import style from './bookmark_folder_row.module.css';

const BookmarkFolderRow = ()=>{

    return (<div className={style.container}>
        <img src='/imgs/folder.svg' className={style.bookmark_folder} />
        <div className={style.folder_title}>春展示会</div>
        <div className={style.created_at}>2023/1/13</div>
    </div>);
}

export default BookmarkFolderRow