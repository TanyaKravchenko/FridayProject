import React from 'react'
import {Login} from './Login';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {path} from "../../n1-main/m1-ui/routes/Routes";
import {useFormik} from "formik";
import {loginTC} from "../../n1-main/m2-bll/reducers/login-reducer";
import {RequestStatusType} from "../../n1-main/m2-bll/reducers/app-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const LoginContainer: React.FC = () => {
    const loginIn = useSelector<RootStateType, boolean>(state=> state.login.isLoggedIn)
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
            if (!values.password) {
                errors.password = 'Required';
            }else if (values.password.length <= 3 || values.password.length>20) {
                errors.password = 'password should consist from 3 to 20 symbols'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    if(loginIn){
        return <Redirect to={path.PROFILE} />
    }
    return (

        <div>
            {status==='loading' && <div style={{padding:'20px', fontSize:'25px', textAlign:'left'}}>Loading...</div>}
            <Login formik={formik} status={status}/>
        </div>
    )
}
