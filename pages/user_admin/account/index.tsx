import style from './account.module.css'
import UserProfileSimpleDisplay from '../../../components/user_profile/simple_display'
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { useState,useEffect} from 'react'
import cstyle from '../../../components/css/style.module.css'
import TeamInvitation from '../../../components/user_admin/team_invitation/team_invitation'

const Account = ()=>{
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const [imgUrl, setImgUrl] = useState<string|null>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");

    // 画像を　public_profile_icons/{user.id}/icon.png に登録する
    const uploadIcon = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const file = e.target.files[0];

            // サイズチェック 1MB以下
            if(file.size > 1024 * 1024){
                alert('ファイルサイズは1MB以下にしてください');
                return;
            }

            const { data, error } = await supabaseClient.storage
                .from('public_profile_icons').upload(`${user?.id}/icon.png`, file);
            if(error){
                alert('アップロード失敗');
        
            }else{
                alert('アップロード成功');

                let img_url = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL}/public_profile_icons/${user?.id}/icon.png`;
                setImgUrl(img_url);


            }
        }
    }

    // 画像が、NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL/public_profile_icons/{user.id}/icon.png にあるか確認する
    const checkIcon = async ()=>{
        let img_url = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL}/public_profile_icons/${user?.id}/icon.png`;
        // 画像があるかaxiosで確認
        axios.get(img_url).then((d)=>{
            setImgUrl(img_url);
        }).catch((error)=>{
            setImgUrl(null);
        });
    }

    /*
        ka_user_public_detail_profileに、upsertする
        user_id uuid not null,
        name text null,
        description text null,
        job_title text null,
    */
   const getProfile = async ()=>{

        if(user){
            let {data,error} = await supabaseClient.from('ka_user_public_detail_profile').select().eq('user_id',user?.id);
            if(error){
            //  alert('取得失敗');
            }else{
                if(data){
                    if(data.length > 0){
                        let d = data[0];
                        setName(d.name);
                        setDescription(d.description);
                        setJobTitle(d.job_title);
                    }
                }
            }
        }
    }


    const upsertProfile = async ()=>{
        let {data,error} = await supabaseClient.from('ka_user_public_detail_profile').upsert({
            user_id:user?.id,
            name:name,
            description:description,
            job_title:jobTitle
        }).select();
        if(error){
            alert('更新失敗');
        }else{
            alert('更新成功');
        }
    }

    useEffect(()=>{
        (async ()=>{
            if(user){
                await checkIcon();
                await getProfile();
            }

        })();
    },[user]);

    return (<div>
            <h1>個人アカウント</h1>
            <UserProfileSimpleDisplay />

            {/* チーム招待を承諾する */}
            <div>
                <TeamInvitation />
            </div>

            {/* 画像があるとき、アイコン画像を表示*/}
            {imgUrl && <img src={imgUrl} className={style.icon_img} />}

            {/* 画像のアップロードボタン 画像ファイルを選択というタイトル */}
            <div className={style.upload_icon_container}>
                <label htmlFor="upload_icon" className={style.upload_icon_label}>画像ファイルを選択</label>
                <input type="file" id="upload_icon" className={style.upload_icon_input} onChange={uploadIcon} />
            </div>

            {/*
                下記のテーブルのフォーム
                ka_user_public_detail_profile  
                user_id uuid not null,
                name text null,
                description text null,
                job_title text null,
            */}

            <div className={style.profile_container}>
                <div className={style.profile_item}>
                    <label>名前</label>
                    <input type="text" defaultValue={name} onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className={style.profile_item}>
                    <label>自己紹介</label>
                    <textarea defaultValue={description} onChange={(e)=>{setDescription(e.target.value)}} />
                </div>
                <div className={style.profile_item}>
                    <label>職業</label>
                    <input type="text" defaultValue={jobTitle} onChange={(e)=>{setJobTitle(e.target.value)}} />
                </div>
                <div className={cstyle.btn} onClick={upsertProfile}>登録/修正</div>
            </div>
    </div>)
}

export default Account