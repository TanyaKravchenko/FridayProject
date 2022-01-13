import React, {useState} from 'react';
import s from './Profile.module.scss';
import Button from '../super components/Button/Button';
import {EditableSpan} from '../../common/editableSpan/EditableSpan';
import {ProfileType} from '../../n1-main/m3-dal/auth-api';
import {DoubleSliderContainer} from '../doubleSlider/DoubleSliderContainer';
import {UpdatePhoto} from "./updatePhoto/UpdatePhoto";

type ProfilePropsType = {
    user: ProfileType | null
    updateUserName: (value: string) => void
    onClickLogOut: () => void
}

const Profile: React.FC<ProfilePropsType> = React.memo((props) => {
    //hooks
    const [openModal, setOpenModal] = useState(false)

    //handlers
    const toOpenModal = ()=>{
        setOpenModal(true)
    }
    const toCloseModal = ()=>{
        setOpenModal(false)
    }
    return (
        <div>
            <div className={s.profileInfo}>
                <span className={s.verify}>{props.user && props.user.verified}</span>
                <h2 className={s.title}>Profile</h2>
                <img src={props.user ? props.user.avatar : ''} alt="user-avatar"/>
                <br/>
                <button onClick={toOpenModal}>update Photo</button>
                {openModal &&
                    <UpdatePhoto
                        width={400}
                        height={400}
                        closeModal={toCloseModal}
                    />
                }


                <EditableSpan title={props.user && props.user.name} className={s.userName}
                              updateUserName={props.updateUserName}/>
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