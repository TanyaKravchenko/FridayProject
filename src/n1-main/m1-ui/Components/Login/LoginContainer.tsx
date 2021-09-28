import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Login} from "./Login";
import {Redirect} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
}

export type InitialValuesType = {
    email: string
    password: string
    rememberMe: boolean
}


export const LoginContainer: React.FC = () => {

    return (
        <div>
            <Login />
        </div>
    )
}
