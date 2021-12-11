import React from 'react';
import s from './Password.module.scss';

type PasswordRecoveryPropsType = {}

const PasswordRecovery: React.FC<PasswordRecoveryPropsType> = () => {
    return (
        <div className={s.passwordRecoveryContainer}>
            PasswordRecovery
        </div>
    );
}

export default PasswordRecovery;