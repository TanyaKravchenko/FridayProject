import React from 'react';
import s from './Login.module.css';
import {FormikProps} from 'formik';
import {InitialValuesType} from './LoginContainer';
import {useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes/Routes';

type LoginPropsType = {
    formik: FormikProps<InitialValuesType>
    cancelHandler?: Function
}

export const Login: React.FC<LoginPropsType> = ({formik, cancelHandler}) => {
    const dispatch = useDispatch()

    return (
        <div className={s.loginBlock}>
            <div className={s.loginCard}>
                <h1 className={s.title}>It-incubator</h1>
                <h2>Sign In</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.formBlock}>
                        <div className={s.inputItem}>
                            <label htmlFor="email" className={s.labelTitle}>Email</label>
                            <input
                                defaultValue={ "nya-admin@nya.nya"	}
                                {...formik.getFieldProps('email')}  />
                            <div style={{'color': 'red', 'height': '10px'}}>
                                {formik.touched.email && formik.errors.email && formik.errors.email}
                            </div>

                        </div>
                        <div className={s.inputItem}>
                            <label htmlFor="password" className={s.labelTitle}>Password</label>
                            <input defaultValue={ "1qazxcvBG"	}
                                   type='password'
                                   {...formik.getFieldProps('password')}
                            />
                            <div style={{'color': 'red', 'height': '10px'}}>
                                {formik.touched.password && formik.errors.password && formik.errors.password}
                            </div>
                        </div>
                        <div className={s.navLinkBlock}>
                            <NavLink to={routes.forgotPass} className={s.navLink}>Forgot password</NavLink>
                        </div>
                        <div className={s.inputItem}>
                            Remember me<input

                            type={'checkbox'}
                            {...formik.getFieldProps("rememberMe")}
                            checked={formik.values.rememberMe}/>


                        </div>
                        <div className={s.buttonsBlock}>

                            <button type="submit" className={s.button}> login</button>
                        </div>
                        <div>
                            Don`t have an account?
                            <NavLink to={routes.register}>Sing Up</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}