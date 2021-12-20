import React from 'react';
import s from './Profile.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {logoutTC} from '../../n1-main/m2-bll/reducers/login-reducer';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {ProfileType} from '../../n1-main/m3-dal/auth-api';
import {updateUser} from '../../n1-main/m2-bll/reducers/profile-reducer';
import Profile from './Profile';
import {Packs} from '../packs/Packs';
import {Paginator} from '../paginator/Paginator';

const ProfileContainer: React.FC = React.memo(() => {

    //hooks
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const user = useSelector<RootStateType, ProfileType | null>(state => state.profile.user)
    const loginIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch();

    //terms
    if (!loginIn) {
        return <Redirect to={path.LOGIN}/>
    }

    //handlers
    const onClickLogOut = () => {
        dispatch(logoutTC())
    }
    const updateUserName = (value: string) => {
        dispatch(updateUser(value))
    }
    console.log(user)

    return (
        <div className={s.profileContainer}>
            <div>
                <Profile user={user} updateUserName={updateUserName} onClickLogOut={onClickLogOut}/>
            </div>
            <div>
                <Packs/>
                <Paginator/>
            </div>
        </div>
    );
})

export default ProfileContainer;