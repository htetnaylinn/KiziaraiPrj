import style from './fabrics.module.css';
import UserAdminFabricsList from '../../../components/user_admin/fabrics/list';

const UserAdminFabrics = (props : any)=>{

    return (
        <div className={style.container}>
            <h1>fabrics</h1>
            <UserAdminFabricsList />
        </div>
    )
}

export default UserAdminFabrics;