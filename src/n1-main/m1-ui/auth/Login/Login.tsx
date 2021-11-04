import React from 'react';
import s from './Login.module.css';

type LoginPropsType = {
    // formik: FormikProps<InitialValuesType>
    cancelHandler?: Function
}

export const Login: React.FC<LoginPropsType> = () => {


    return (
        <div className={s.loginBlock}>
           Login
        </div>
    )
}

export default Login;