import style from './style.module.css';
import UserProfileSimpleDisplay from '../../../components/user_profile/simple_display';
import cstyle from '../../../components/css/style.module.css';
import axios from 'axios';
import { useUserContext } from '../../../components/providers/UserContext';

const UserAdminGetPoints = ()=>{

    const {activeGroupPoints,reloadActiveGroupPoints,selectedLangId} = useUserContext();
        // ポイントの取得
    // /api/group_points/get_points
    const getPointTest = async ()=>{
        await axios.post("/api/group_points/get_points").then((d)=>{
            alert('ok');
            console.log('取得ok',d);

            reloadActiveGroupPoints();
        }).catch((error)=>{
            alert('ng');
            console.log('取得ng',error);
        });
    }

    return (<div className={style.container}>
        <UserProfileSimpleDisplay />
        <h2>ポイントの取得</h2>
        <div className={cstyle.btn} onClick={getPointTest}>ポイント購入(テスト、Stripeなし)</div>
    </div>);
}

export default UserAdminGetPoints;