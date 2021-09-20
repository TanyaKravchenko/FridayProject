import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Profile from '../Components/Profile/Profile';
import AllSuperComponents from '../Components/SuperComponents/AllSuperComponents';
import Login from '../Components/Login/Login';
import Registration from '../Components/Registration/Registration';
import PasswordRecovery from '../Components/Password/PasswordRecovery';
import NewPassword from '../Components/Password/NewPassword';
import NotFound from '../Components/NotFound/NotFound';

export const path = {
    ALL_COMPONENTS: '/allSuperComponents',
    PROFILE: '/profile',
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD: '/newPassword',
    PASS_REC: '/passwordRecovery',
}

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <AllSuperComponents/>}/>
                <Route path={path.ALL_COMPONENTS} exact render={() => <AllSuperComponents/>}/>
                <Route path={path.PROFILE} exact render={() => <Profile/>}/>
                <Route path={path.LOGIN} exact render={() => <Login/>}/>
                <Route path={path.REG} exact render={() => <Registration/>}/>
                <Route path={path.PASSWORD} exact render={() => <PasswordRecovery/>}/>
                <Route path={path.PASS_REC} exact render={() => <NewPassword/>}/>
                <Route path={'/404'} render={() => <NotFound/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default Routes;