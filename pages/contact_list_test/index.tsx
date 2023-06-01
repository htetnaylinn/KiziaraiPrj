import axios from "axios";
import ContactList from "../../components/contact_list/contact_list";
import style from './style.module.css'
import { useEffect, useState } from "react";

const ContactListTest = () => {

    const [isShowContactList,setIsShowContactList] = useState<boolean>(false);
    const [memberList,setMemberList] = useState<any[]>([]);

    // コンタクトリストから選択されたメンバーが渡されてくる
    const addMembersCallback = (members : any[])=>{
        console.log(members);
        alert('メンバー追加の確定');
    }

    // コンタクトリストを表示する
    const showContactList = ()=>{
        setIsShowContactList(true);
    }

    useEffect(()=>{
        (async ()=>{
            
            // 通信で受け取るサンプル
            /*
            const res = await axios.get("/get_member_list");
            const data = await res.json();
            setMemberList(data);
            */

            let member_list = [{id:"1",name:"Tom John",role:1,isSelected:false},
            {id:"2",name:"Michel",role:1,isSelected:false},
            {id:"3",name:"John",role:1,isSelected:false},
            {id:"4",name:"Tom Georgia",role:1,isSelected:false},
            {id:"5",name:"Tom John",role:1,isSelected:false},
            {id:"6",name:"Michel Georgia",role:1,isSelected:false},
            {id:"7",name:"John Book",role:1,isSelected:false},
            {id:"8",name:"Tom Cook",role:1,isSelected:false}];

            setMemberList(member_list);

        })();
    },[]);
    return (
        <div className={style.container}>
            <ContactList isShowContactList={isShowContactList} setIsShowContactList={setIsShowContactList} memberList={memberList} addMembersCallback={addMembersCallback} />
            <div className={style.button} onClick={showContactList}>Show</div>
        </div>
    );
}
export default ContactListTest;