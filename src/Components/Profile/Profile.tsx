import React from 'react';
import s from './Profile.module.css';

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    return (
        <div className={s.profileContainer}>
            Profile
        </div>
    );
}

export default Profile;