import React from 'react';
import s from './Login.module.scss';
import InputText from "../super components/InputText/InputText";
import Button from "../super components/Button/Button";
import {useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";

type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = () => {

    return (
        <div className={s.loginBlock}>
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Sign in</h3>
            <div className={s.emailBlock}>
                <span>Email</span>
                <InputText type={'text'} className={s.inputText}/>
            </div>
            <div className={s.passwordBlock}>
                <span>Password</span>
                <input type={'password'} className={s.inputPassword}/>
            </div>
            <a href="#" className={s.link}>Forgot password</a>
            <button className={s.loginBtn}> Login</button>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>Don’t have an account?</span>
                <button className={s.signBtn}>Sign Up</button>
            </div>

        </div>
    )
}