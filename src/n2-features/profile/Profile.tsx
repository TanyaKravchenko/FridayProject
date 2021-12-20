import React from 'react';
import s from './Profile.module.scss';
import Button from '../super components/Button/Button';
import {ProfileType} from '../../n1-main/m3-dal/auth-api';
import {EditableSpan} from '../../common/editableSpan/EditableSpan';

type ProfilePropsType = {
    user: ProfileType | null
    updateUserName: (value: string) => void
    onClickLogOut: () => void
}

const Profile: React.FC<ProfilePropsType> = React.memo((props) => {
    return (
        <div className={s.profile}>
            <span className={s.verify}>{props.user && props.user.verified}</span>
            <h2 className={s.title}>Profile</h2>
            <img src={props.user ? props.user.avatar : ''} alt="user-avatar"/>
            <EditableSpan title={props.user && props.user.name} className={s.userName}
                          updateUserName={props.updateUserName}/>
            <Button onClick={props.onClickLogOut}>Log Out</Button>
        </div>
    );
})

export default Profile;