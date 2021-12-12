import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {useFormik} from "formik";
import {loginTC} from "../../n1-main/m2-bll/reducers/login-reducer";
import {RequestStatusType} from "../../n1-main/m2-bll/reducers/app-reducer";
import {FormikErrorType, PasswordRecovery} from "./PasswordRecovery";


export const PasswordRecoveryContainer: React.FC = () => {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
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
        <div>
            {status==='loading' && <div style={{padding:'20px', fontSize:'25px', textAlign:'left'}}>Loading...</div>}
            <PasswordRecovery formik={formik}/>
        </div>
    )
}
