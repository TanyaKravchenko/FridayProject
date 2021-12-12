import React, {useEffect, useState} from 'react';
import s from './Registration.module.scss';
import {ChangeEvent} from 'react';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {registrationAC, registrationTC, setErrorAC} from '../../n1-main/m2-bll/reducers/registration-reducer';
import {emailValidation, PasswordValidation} from '../../utils/validation';
import {Input} from '../super components/InputText/Input';

type RegistrationPropsType = {}

const Registration: React.FC<RegistrationPropsType> = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const [errorEmailMessage, setErrorEmailMessage] = useState<string>('')
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')

    //const disabledBtnSubmit = !email || !password || !checkPassword

    const dispatch = useDispatch()
    const appStatus = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const isRegistration = useSelector<RootStateType, boolean>(state => state.registration.isRegistration)
    const serverErrorMessage = useSelector<RootStateType, string>(state => state.registration.error)

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorEmailMessage('')
        setEmail(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(''))
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(''))
    }
    const onChangePasswordCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordMessage('')
        setCheckPassword(e.currentTarget.value)
        serverErrorMessage && dispatch(setErrorAC(''))
    }

    const onRegistrationHandler = () => {
        if (!emailValidation(email)) {
            setErrorEmailMessage('Incorrect email')
        } else if (!PasswordValidation(password)) {
            setErrorPasswordMessage('Minimum 8 characters')
        } else if (password !== checkPassword) {
            setErrorPasswordMessage('Enter the same password')
        } else {
            dispatch(registrationTC({email, password}))
            setEmail('')
            setPassword('')
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setErrorAC(''))
            dispatch(registrationAC(false))
        }
    }, [])

    if (isRegistration) {
        return <Redirect to={path.LOGIN}/>
    }

    const goBack = () => {
        window.history.go(-1);
    }

    return (
        <div className={s.registerBlock}>
            <div className={s.registerCard}>
                <h1 className={s.title}>It-incubator</h1>
                <h2>Sign Up</h2>
                <div className={s.formBlock}>
                    <div className={s.inputItem}>
                        <label htmlFor="'registration/email'">Email</label>
                        <Input placeholder="Enter email..."
                               type="text"
                               value={email}
                               onChange={onChangeEmailHandler}
                               errorMessage={errorEmailMessage}
                               id={'registration/email'}
                               view="submit"
                        />
                    </div>
                    <div className={s.inputItem}>
                        <label htmlFor="registration/password">Password</label>
                        <Input placeholder="Enter password..."
                               type="password"
                               value={password}
                               onChange={onChangePasswordHandler}
                               id={'registration/password'}
                               autoComplete={'new-password'}
                               view="submit"
                               errorMessage={errorPasswordMessage}
                        />

                    </div>
                    <div className={s.inputItem}>
                        <label htmlFor="registration/checkPassword">Confirm password</label>
                        <Input placeholder="Confirm password..."
                               type="password"
                               value={checkPassword}
                               onChange={onChangePasswordCheckHandler}
                               id={'registration/checkPassword'}
                               autoComplete={'new-password'}
                               view="submit"
                               errorMessage={errorPasswordMessage}
                        />
                    </div>
                    {!emailValidation(email) && <div style={{color: 'red'}}>{serverErrorMessage}</div>}
                    <div className={s.buttonsBlock}>
                        <button className={s.cancel} onClick={goBack}>Cancel</button>
                        <button
                            type="submit"
                            className={s.register}
                            onClick={onRegistrationHandler}
                            disabled={appStatus === 'loading'}
                            // disabled={disabledBtnSubmit}
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