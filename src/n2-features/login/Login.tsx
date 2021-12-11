import React from 'react';
import s from './Login.module.scss';
import InputText from "../super components/InputText/InputText";

type LoginPropsType = {
    formik: any
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login: React.FC<LoginPropsType> = (props) => {

    return (
        <div className={s.loginBlock}>
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Sign in</h3>
            <form onSubmit={props.formik.handleSubmit}>
                <div className={s.emailBlock}>
                    <span>Email</span>
                    <InputText
                        type={'text'}
                        className={s.inputText}
                        {...props.formik.getFieldProps('email')}
                    />
                    {props.formik.touched.email && props.formik.errors.email ? (
                        <div style={{color: 'red'}}>{props.formik.errors.email}</div>
                    ) : null}
                </div>
                <div className={s.passwordBlock}>
                    <span>Password</span>
                    <input
                        type={'password'}
                        className={s.inputPassword}
                        {...props.formik.getFieldProps('password')}
                    />
                    {props.formik.touched.password && props.formik.errors.password ? (
                        <div style={{color: 'red'}}>{props.formik.errors.password}</div>
                    ) : null}
                </div>
                <a href="#" className={s.link}>Forgot password</a>
                <div className={s.checkboxBlock}>
                    <input
                        type={'checkbox'}
                        className={s.inputPassword}
                        {...props.formik.getFieldProps('rememberMe')}
                    />
                    <span>Remember me</span>
                </div>
                <button
                    className={s.loginBtn}
                    type="submit"
                > Login
                </button>
            </form>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>Don’t have an account?</span>
                <button className={s.signBtn}>Sign Up</button>
            </div>

        </div>
    )
}