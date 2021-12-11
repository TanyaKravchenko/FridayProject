import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Profile from '../../../n2-features/Profile/Profile';
import AllSuperComponents from '../../../n2-features/super components/AllSuperComponents';
import Registration from '../../../n2-features/Registration/Registration';
import PasswordRecovery from '../../../n2-features/Password/PasswordRecovery';
import NewPassword from '../../../n2-features/Password/NewPassword';
import NotFound from '../../../n2-features/NotFound/NotFound';
import {LoginContainer} from '../../../n2-features/Login/LoginContainer';

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
                <Route path={path.LOGIN} exact render={() => <LoginContainer/>}/>
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


export const routes = {
    mainPacks: '/main/packs',
    mainCards: '/main/cards/:id/:name',
    login: '/login',
    register: '/register',
    forgotPass: '/restore-pass',
    setPass: `/set-new-password/:token?`,
    err404: '/404',
    profile: '/profile',
    testPage: '/TestPage',
    learnQuestion: '/LearnQuestion/:name/:id'
}