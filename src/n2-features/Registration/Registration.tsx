import React from 'react';
import s from './Registration.module.css';

type RegistrationPropsType = {}

const Registration: React.FC<RegistrationPropsType> = () => {
    return (
        <div className={s.registrationContainer}>
            Registration/hello/hello
        </div>
    );
}

export default Registration;