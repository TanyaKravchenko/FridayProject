import React from 'react';
import s from './Password.module.css';

type NewPasswordPropsType = {}

const NewPassword: React.FC<NewPasswordPropsType> = () => {
    return (
        <div className={s.newPasswordContainer}>
            NewPassword
        </div>
    );
}

export default NewPassword;