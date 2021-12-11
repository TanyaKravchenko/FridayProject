import React, {useState} from 'react';
import s from './Registration.module.scss';
import { ChangeEvent } from 'react';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';

type RegistrationPropsType = {}

const Registration: React.FC<RegistrationPropsType> = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangePasswordCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(e.currentTarget.value)
    }

    // if (isRegistration) {
    //     return <Redirect to={path.LOGIN}/>
    // }
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
                        <button type="submit" className={s.register}>Register</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Registration;