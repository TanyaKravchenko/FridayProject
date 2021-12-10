import React from 'react';
import s from './Login.module.css';

type LoginPropsType = {
}

export const Login: React.FC<LoginPropsType> = () => {
    return (
        <div className={s.loginBlock}>
            Login
        </div>
    )
}