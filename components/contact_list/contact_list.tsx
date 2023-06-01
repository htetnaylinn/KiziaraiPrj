import style from './style.module.css'
import { useState,useEffect} from 'react';


const ContactList = (props : any)=>{
    /*
     props
        setIsShowContactList --- function　コンタクトリストを表示するかどうかをセットする関数
        isShowContactList --- boolean　コンタクトリストを表示するかどうか
        memberList --- array　メンバーリスト
        addMembersCallback --- function　メンバー追加の確定時に呼ばれる
    */

    const [selectedMemberList,setSelectedMemberList] = useState<any[]>([]); // 選択されたメンバーリスト

    // コンタクトリストを閉じる
    const closeContactList = ()=>{
        props.setIsShowContactList(false);
    }

    // 各メンバークリック時に、メンバーから追加or削除
    const addOrRemoveMember = (member : any)=>{
        member.isSelected = !member.isSelected;
        if(member.isSelected){
            setSelectedMemberList([...selectedMemberList,member]);
        }else{
            setSelectedMemberList(selectedMemberList.filter((selected_member)=>selected_member.id != member.id));
        }
    }

    // メンバー追加の確定
    const confirmMembers = ()=>{
        if (selectedMemberList.length > 0) {
            closeContactList();
            props.addMembersCallback(selectedMemberList);
        }
    }

    useEffect(()=>{
    },[]);

    return (<>
    {props.isShowContactList ?
    
    <div className={style.container}>

    <div className={style.list_container}>
        <div className={style.contact_list_container}>
            {props.memberList.map((member : any)=>{
                return (
                    
                    <div key={member.id} className={member.isSelected ? style.contact_list_item_selected : style.contact_list_item} onClick={ ()=>{ 
                        addOrRemoveMember(member);
                    }}>
                        <div className={style.contact_list_item_row}>{member.name}</div>
                    </div>
                          
                );
            })}
        </div>


        <div className={style.btn_container}>
            <div className={style.add_button} onClick={confirmMembers}>Add members</div>
            <div className={style.close_button} onClick={closeContactList}>Close</div>
        </div>
    </div>
    
</div>

     :
    <></>
   }

    </>
    
   )
}
export default ContactList;