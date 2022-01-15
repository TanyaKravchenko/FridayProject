import React, {useState} from 'react';
import s from './Profile.module.scss';
import Button from '../super components/Button/Button';
import {EditableSpan} from '../../common/editableSpan/EditableSpan';
import {ProfileType} from '../../n1-main/m3-dal/auth-api';
import {DoubleSliderContainer} from '../doubleSlider/DoubleSliderContainer';
import {UpdateProfile} from "./updateProfile/UpdateProfile";

type ProfilePropsType = {
    user: ProfileType
    updateUserName: (value: string, avatar:string) => void
    onClickLogOut: () => void
}

const Profile: React.FC<ProfilePropsType> = React.memo((props) => {
    //hooks
    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState(props.user.name)
    const [avatar, setAvatar] = useState(props.user.avatar)
    //handlers
    const toOpenModal = () => {
        setOpenModal(true)
    }
    const toCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <div>
            <div className={s.profileInfo}>
                <span className={s.verify}>{props.user && props.user.verified}</span>
                <h2 className={s.title}>Profile</h2>
                <img src={props.user ? avatar : ''} alt="user-avatar"/>
                <br/>
                <h2>{name}</h2>
                <Button  onClick={toOpenModal}>Edit Profile</Button>
                {/*<button onClick={toOpenModal}>edit Profile</button>*/}
                {openModal &&
                    <UpdateProfile
                        width={500}
                        height={500}
                        closeModal={toCloseModal}
                        updateUserName={props.updateUserName}
                        name={name}
                        setName={setName}
                        avatar={avatar}
                        setAvatar={setAvatar}
                    />
                }
                <Button onClick={props.onClickLogOut}>Log Out</Button>
            </div>
            <div className={s.cardsFilter}>
                <h3>Number of cards</h3>
                <div className={s.range}>
                    <DoubleSliderContainer/>
                </div>
            </div>
        </div>
    );
})

export default Profile;