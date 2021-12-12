import React from 'react';
import s from './Password.module.scss';
import InputText from "../super components/InputText/InputText";

type PasswordRecoveryPropsType = {
    formik: any
}

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const PasswordRecovery: React.FC<PasswordRecoveryPropsType> = (props) => {
    return (
        <div className={s.passwordRecoveryBlock}>
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Forgot your password?</h3>
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
                <div className={s.redirectBlock}>
                    <span className={s.redirectSpan}>
                         Enter your email address and we will send you further instructions
                    </span>

                </div>

                <button
                    className={s.sendBtn}
                    type="submit"
                > Send Instructions
                </button>
            </form>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>Did you remember your password?</span>
                <button className={s.signBtn}>Try logging in</button>
            </div>
        </div>
    );
}
