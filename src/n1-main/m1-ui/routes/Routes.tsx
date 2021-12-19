import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Profile from '../../../n2-features/profile/Profile';
import AllSuperComponents from '../../../n2-features/super components/AllSuperComponents';
import Registration from '../../../n2-features/registration/Registration';
import NotFound from '../../../n2-features/notFound/NotFound';
import {LoginContainer} from '../../../n2-features/login/LoginContainer';
import {PasswordRecoveryContainer} from "../../../n2-features/password/PasswordRecoveryContainer";
import {NewPassword} from "../../../n2-features/password/NewPassword";
import {Packs} from "../../../n2-features/packs/Pacs";
import {Cards} from "../../../n2-features/cards/Cards";

export const path = {
    ALL_COMPONENTS: '/allSuperComponents',
    PROFILE: '/profile',
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD: '/newPassword/:token?',
    PASS_REC: '/passwordRecovery',
    PACKS:'/packs',
    CARDS:'/cards',

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
                <Route path={path.PASSWORD}  render={() =><NewPassword/> }/>
                <Route path={path.PACKS}  render={() =><Packs/> }/>
                <Route path={path.CARDS}  render={() =><Cards/> }/>
                <Route path={path.PASS_REC} exact render={() => <PasswordRecoveryContainer/>}/>
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