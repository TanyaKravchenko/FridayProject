import React, {useState} from 'react';
import s from './Registration.module.scss';
import {ChangeEvent} from 'react';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {registrationTC, setErrorAC} from '../../n1-main/m2-bll/reducers/registration-reducer';

type RegistrationPropsType = {}

const Registration: React.FC<RegistrationPropsType> = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("")

    const disabledBtnSubmit = !email || !password || !checkPassword

    const dispatch = useDispatch()
    const appStatus = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const isRegistration = useSelector<RootStateType, boolean>(state => state.registration.isRegistration)
    const serverErrorMessage = useSelector<RootStateType, string>(state => state.registration.error)

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorEmailMessage("")
        setEmail(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(""))
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage("")
        setPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(""))
    }
    const onChangePasswordCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage("")
        setCheckPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(""))
    }

    const onRegistrationHandler = () => {
        if (password === '' || email === '') {
            alert('Field is required')
        } else if (checkPassword !== password) {
            alert('Passwords are different!')
        } else {
            dispatch(registrationTC({email, password}))
            setEmail('')
            setPassword('')
        }
    }

    if (isRegistration) {
        return <Redirect to={path.LOGIN}/>
    }

    return (
        <div className={s.registerBlock}>
            <div className={s.registerCard}>
                <h1 className={s.title}>It-incubator</h1>
                <h2>Sign Up</h2>
                <div className={s.formBlock}>
                    <div className={s.inputItem}>
                        <label htmlFor="'registration/email'">Email</label>
                        <input placeholder="Enter email..."
                               type="text"
                               value={email}
                               onChange={onChangeEmailHandler}
                               id={'registration/email'}/>
                    </div>
                    <div className={s.inputItem}>
                        <label htmlFor="registration/password">Password</label>
                        <input placeholder="Enter password..."
                               type="password"
                               value={password}
                               onChange={onChangePasswordHandler}
                               id={'registration/password'}
                               autoComplete={'new-password'}/>
                    </div>
                    <div className={s.inputItem}>
                        <label htmlFor="registration/checkPassword">Confirm password</label>
                        <input placeholder="Confirm password..."
                               type="password"
                               value={checkPassword}
                               onChange={onChangePasswordCheckHandler}
                               id={'registration/checkPassword'}
                               autoComplete={'new-password'}/>
                    </div>
                    <div className={s.buttonsBlock}>
                        <button className={s.cancel}>Cancel</button>
                        <button
                            type="submit"
                            className={s.register}
                            onClick={onRegistrationHandler}
                            disabled={appStatus === 'loading'}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Registration;