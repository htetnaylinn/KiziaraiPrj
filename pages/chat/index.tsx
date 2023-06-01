import style from './chat.module.css'
import SideMenu from '../../components/side_menu/side_menu';
import { useState,useEffect } from 'react';
import ChatMessage from '../../components/chat_message/chat_message';
import ChatContactList from '../../components/chat_contact_list/chat_contact_list';

import ChatProfileLeft from '../../components/chat_profile_left/chat_profile_left';
import ChatProfileRight from '../../components/chat_profile_right/chat_profile_right';
import ChatChat from '../../components/chat_chat/chat_chat';
import ChatTop from '../../components/chat_top/chat_top';
import ContactList from "../../components/contact_list/contact_list";

import axios from 'axios';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const ChatIndex = ()=> {
    const [isTabSupplierSelected,setIsTabSupplierSelected] = useState(true);
    const [isTabBuyerSelected,   setIsTabBuyerSelected]    = useState(false);
    const [isTabMediatorSelected,setIsTabMediatorSelected] = useState(false);
    
    const [userProfile, setUserProfile] = useState<any>()
    const [threads, setThreads] = useState<any[]>([])
    const [messages,setMessages] = useState<any[]>([]);
    const [threadId, setThreadId] = useState(0)
    const [thread, setThread] = useState<any>()
    const [isShowContactList,setIsShowContactList] = useState<boolean>(false);
    const [memberList,setMemberList] = useState<any[]>([]);

    const router = useRouter()
    const user = useUser()
    const supabaseClient = useSupabaseClient();

    // - api(mock)

    const [mockMessages, setMockMessages] = useState<{[key: number]: [any]}>({})

    // - api

    const fetchUserProfile = async (): Promise<any> => {
        const { data, error } = await supabaseClient.from('ka_user_profile').select('*').eq('user_id', user?.id)
        return new Promise((resolve, reject) => {
            if (data == null) {
                reject()
            } else {
                let userProfile = {
                    id: data?.at(0)?.user_id,
                    groupId: data?.at(0)?.active_group_id,
                    iconUrl: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL}/public_profile_icons/${data?.at(0)?.user_id}/icon.png`,
                    name: 'あなた'
                }
                setUserProfile(userProfile)
                resolve(userProfile)
            }
        })
    }

    const fetchThreads = async () => {
        const userProfile = await fetchUserProfile()
        // スレッド一覧取得サンプル:
        // TODO: role_idでも絞る
        // const { data, error } = await supabaseClient.from('ka_view_user_chat_threads').select('*')
        // .eq('user_id', user?.id)
        // .eq('group_id', userProfile.groupId)
        // .order('updated_at', { ascending: false })
        // if (data == null) return console.log('no threads')
        // スレッド一覧サンプル:
        let data = [
            {threadId: 1, iconUrl: "./imgs/icon_sample1.jpg", threadName: "山田太郎"}, 
            {threadId: 2, iconUrl: "./imgs/icon_sample2.jpg", threadName: "田中一郎"}, 
            {threadId: 3, iconUrl: "./imgs/icon_sample3.jpg", threadName: "大谷翔平"}, 
        ]
        setThreads(data)
    }

    const fetchMessages = async (threadId: number, userId: string) => {
        // メッセージ一覧取得サンプル:
        // const { data, error } = await supabaseClient.from('ka_chat_messages').select('*').eq('thread_id', threadId).order('created_at', { ascending: false })
        // メッセージ一覧サンプル:
        if (Object.keys(mockMessages).length === 0) {
            mockMessages[1] = [{user_id: "abc", message: "こんにちは、よろしくお願いいたします。", created_at: "2023/1/1", user_icon_url: "./imgs/icon_sample1.jpg"}]
            mockMessages[2] = [{user_id: "abc", message: "こんばんは、よろしくお願いします。", created_at: "2023/1/1", user_icon_url: "./imgs/icon_sample2.jpg"}]
            mockMessages[3] = [{user_id: "abc", message: "さようなら。", created_at: "2023/1/1", user_icon_url: "./imgs/icon_sample3.jpg"}]
        }
        let data = mockMessages[threadId]
        let error = null
        if (data) {
            let messages = data.map((data: any, index: number) => {
                let date = new Date(data.created_at)
                return {
                    isLeft: data.user_id != userId,
                    userIconUrl: data.user_icon_url,
                    message: data.message,
                    date: date.toLocaleDateString() + " " + date.toLocaleTimeString(), 
                    isNew: true
                }
            })
            setMessages(messages)
        } else {
            console.log(error)
        }
    }

    const postMessage = async (theadId: number, userId: string, message: string) => {
        // メッセージ投稿サンプル:
        // const { error } = await supabaseClient.from('ka_chat_messages').insert({ thread_id: threadId, user_id: userId, message: message })
        // -- モックメッセージ追加ここから --
        mockMessages[threadId].unshift({
            user_id: userId,
            message: message,
            created_at: (new Date()).toJSON(),
            user_icon_url: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL}/public_profile_icons/${userId}/icon.png`
        })
        let error = null
        // -- ここまで --
        if (error == null) {
            fetchMessages(theadId, userId)
        } else {
            console.log(error)
        }
    }

    const fetchAgents = async () => {
        // 友人登録済みリスト、もしくは、全体に公開しているメンバーのテーブル(要件として定まっていない)から、特定のroleのユーザーを取得する
        // let {data,error} = await supabase.from('ka_friends').select().eq('user_id', userProfile.id).eq('role_id',role_id)
        //　取得済みのリストのサンプル
        let data = [{"id":1, "group_id": 1, "role_id": 1, "name":"John Appleseed"},
                    {"id":2, "group_id": 1, "role_id": 1, "name":"Hayato Tani"},
                    {"id":3, "group_id": 1, "role_id": 1, "name":"Bob Sapp"}];
        let error = null
        if (data) {
            setMemberList(data)
        } else {
            console.log(error)
        }
    }

    const addThreadMembers = async (members: any) => {
        alert('メンバーを追加しました。')
        // メンバー追加サンプル:
        // const { error } = await supabaseClient.from('ka_chat_thread_members').insert(
        //     members.map((data: any) => {
        //         return {
        //             thread_id: threadId,
        //             user_id: data.id,
        //             group_id: data.group_id,
        //             role_id: data.role_id,
        //         }
        //     })
        // )
        let error = null
        if (error) {
            console.log(error)
        } else {
            fetchAgents()
        }
    }

    // - life cycle

    useEffect(()=>{
        if (user) {
            if (threadId > 0) {
                fetchMessages(threadId, user.id)
            } else {
                fetchThreads()
            }
        } else {
            router.push('/sign_in')
        }
    },[]);

    // - events

    const onClickThread = (threadId: number) => {
        fetchAgents()
        setThreadId(threadId)
        setThread(threads.filter(thread => thread.threadId == threadId)[0])
        console.log(thread)
        fetchMessages(threadId, userProfile.id)
    }

    const onClickPost = (message: string) => {
        if (user) {
            postMessage(threadId, user.id, message)
        }
    }

    const onClickAgent = () => {
        if (memberList.length > 0) {
            setIsShowContactList(true)
        }
    }

    // コンタクトリストから選択されたメンバーが渡されてくる
    const addMembersCallback = (members : any[])=>{
        addThreadMembers(members)
    }

    // - dom

    return (
    <div className={style.all_container}>
        <div className={style.contact_list_container}>
            <ContactList isShowContactList={isShowContactList} setIsShowContactList={setIsShowContactList} memberList={memberList} addMembersCallback={addMembersCallback} />
        </div>
        <div className={style.left_container}>
            <SideMenu/>
        </div>
       
        <div className={style.right_container}>
            <div className={style.chat_ui_container}>
                <div className={style.tab_container}>
                    <div className={style.tab_buttons_container}>
                        <div className={isTabSupplierSelected ? `${style.tab} ${style.tab_selected}` : style.tab}>Supplier</div>
                        <div className={isTabBuyerSelected ? `${style.tab} ${style.tab_selected}` : style.tab}>Buyer</div>
                        <div className={isTabMediatorSelected ? `${style.tab} ${style.tab_selected}` : style.tab}>仲介者</div>
                    </div>
                </div>
                <div className={style.main_ui_container}>

                    <div className={style.member_list_container}>
                        <div className={style.member_list_search_container}>
                            <input type="text"  className={style.member_search_input}/>
                            <ChatContactList threads={threads} onClickThread={onClickThread} />
                        </div>
                        <div className={style.member_list_contact_container}></div>
                        <div className={style.member_list}>
                            <div className={style.member_row}>
                                <div className={style.member_icon}></div>
                                <div className={style.member_info_container}>
                                    <div className={style.member_name}></div>
                                    <div className={style.member_description}></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={style.chat_area_container}>
                        {threadId > 0 ? <ChatChat messages={messages} thread={thread} userProfile={userProfile} onClickPost={onClickPost} onClickAgent={onClickAgent} /> : <></>}
                        {threadId == 0 ? <ChatTop /> : <></>}   
                    </div>
                </div>
            </div>

        </div>
    </div>)
}
export default ChatIndex;