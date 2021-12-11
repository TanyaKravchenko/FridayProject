import React from 'react'
import {Login} from './Login';
import {useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {path} from "../../n1-main/m1-ui/routes/Routes";

export const LoginContainer: React.FC = () => {
    const loginIn = useSelector<RootStateType, boolean>(state=> state.login.isLoggedIn)
    if(loginIn){
        return <Redirect to={path.ALL_COMPONENTS} />
    }
    return (

        <div>
            <Login />
        </div>
    )
}
