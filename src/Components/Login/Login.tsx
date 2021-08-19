import React from 'react';
import s from './Login.module.css';

type LoginPropsType = {}

const Login: React.FC<LoginPropsType> = React.memo(() => {
    return (
        <div className={s.loginContainer}>
            Login
        </div>
    );
});

export default Login;