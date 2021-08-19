import React from 'react';
import s from './Password.module.css';

type PasswordRecoveryPropsType = {}

const PasswordRecovery: React.FC<PasswordRecoveryPropsType> = () => {
    return (
        <div className={s.passwordRecoveryContainer}>
            PasswordRecovery
        </div>
    );
}

export default PasswordRecovery;