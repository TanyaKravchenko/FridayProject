import React from 'react';
import s from './Profile.module.scss';
import funnyKid from './../../assets/images/funnyKid.jpg';
import Button from "../super components/Button/Button";
import {useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {ProfileDataType} from "../../n1-main/m2-bll/reducers/profile-reducer";
type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    const profileData = useSelector<RootStateType, ProfileDataType>(state=> state.profile.profileData)
    return (
        <div className={s.profile}>
            <span className={s.verify}>{profileData.verified}</span>
            <h2 className={s.title}>Profile</h2>
            <img src={profileData.avatar} alt="funnyKid"/>

            <h3 className={s.userName}>{profileData.name}</h3>
            <Button>Log Out</Button>
        </div>
    );
}

export default Profile;