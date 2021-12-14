import React from 'react';
import s from './Profile.module.scss';
import Button from "../super components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {ProfileDataType} from "../../n1-main/m2-bll/reducers/profile-reducer";
import {Redirect} from "react-router-dom";
import {path} from "../../n1-main/m1-ui/routes/Routes";
import {logoutTC} from "../../n1-main/m2-bll/reducers/login-reducer";
import {RequestStatusType} from "../../n1-main/m2-bll/reducers/app-reducer";
import {Preloader} from "../../common/preloader/Preloaders";

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const profileData = useSelector<RootStateType, ProfileDataType>(state=> state.profile.profileData)
    const loginIn = useSelector<RootStateType, boolean>(state=> state.login.isLoggedIn)
    const dispatch = useDispatch();
    if(!loginIn){
       return <Redirect to={path.LOGIN}/>
    }
    const onClickLogOut = ()=>{
        dispatch(logoutTC())
    }
    return (
        <>
            {status==='loading' && <Preloader/>}
            <div className={s.profile}>
                <span className={s.verify}>{profileData.verified}</span>
                <h2 className={s.title}>Profile</h2>
                <img src={profileData.avatar} alt="funnyKid"/>

                <h3 className={s.userName}>{profileData.name}</h3>
                <Button onClick={onClickLogOut}>Log Out</Button>
            </div>
    </>

    );
}

export default Profile;