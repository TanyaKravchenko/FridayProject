import React from 'react';
import s from './Password.module.scss';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {FormikErrorType} from "./PasswordRecovery";
import {loginTC} from "../../n1-main/m2-bll/reducers/login-reducer";

type NewPasswordPropsType = {}

export const NewPassword: React.FC<NewPasswordPropsType> = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    return (
        <div className={s.passwordRecoveryBlock}>
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Create new password</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.passwordBlock}>
                    <span>Password</span>
                    <input
                        type={'password'}
                        className={s.inputPassword}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{color: 'red'}}>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className={s.redirectBlock}>
                    <span className={s.redirectSpan}>
                         Create new password and we will send you further instructions to email
                    </span>

                </div>

                <button
                    className={s.sendBtn}
                    type="submit"
                > Create new password
                </button>
            </form>

        </div>
    );
}

