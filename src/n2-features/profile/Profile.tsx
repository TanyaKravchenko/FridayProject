import React from 'react';
import s from './Profile.module.scss';
import Button from '../super components/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {logoutTC} from '../../n1-main/m2-bll/reducers/login-reducer';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {Preloader} from '../../common/preloader/Preloaders';
import {ProfileType} from '../../n1-main/m3-dal/auth-api';

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    //hooks
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const user = useSelector<RootStateType, ProfileType | null>(state => state.profile.user)
    const loginIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch();

    if (!loginIn) {
        return <Redirect to={path.LOGIN}/>
    }

    //handlers
    const onClickLogOut = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.profileContainer}>
            {status === 'loading' && <Preloader/>}
            <div className={s.profile}>
                <span className={s.verify}>{user && user.verified}</span>
                <h2 className={s.title}>Profile</h2>
                <img src={user ? user.avatar : ''} alt="user-avatar"/>

                <h3 className={s.userName}>{user && user.name}</h3>
                <Button onClick={onClickLogOut}>Log Out</Button>
            </div>
        </div>
    );
}

export default Profile;