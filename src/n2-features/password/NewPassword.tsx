import React from 'react';
import s from './Password.module.scss';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {FormikErrorType} from "./PasswordRecovery";
import {useParams} from "react-router";
import {newPasswordTC, setPasswordAC} from "../../n1-main/m2-bll/reducers/password-recovery-reducer";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../n1-main/m2-bll/reducers/app-reducer";
import {path} from "../../n1-main/m1-ui/routes/Routes";

type NewPasswordPropsType = {}

export const NewPassword: React.FC<NewPasswordPropsType> = () => {
    const isSetPassword = useSelector<RootStateType, boolean>(state => state.passwordRecovery.isSetPassword)
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const {token} = useParams<{ token: string }>();
    const resetPasswordToken = token
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 3 || values.password.length > 20) {
                errors.password = 'password should consist from 3 to 20 symbols'
            }
            return errors;
        },
        onSubmit: values => {
            const password = values.password
            dispatch(newPasswordTC({password, resetPasswordToken}))
            formik.resetForm()
            dispatch(setPasswordAC(true))
        },
    })

    if (isSetPassword) {
        return <Redirect to={path.LOGIN}/>
    }
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

