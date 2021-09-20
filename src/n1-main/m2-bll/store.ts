import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import {appReducer} from './Reducers/app-reducer';
import {loginReducer} from './Reducers/login-reducer';
import {profileReducer} from './Reducers/profile-reducer';
import {registrationReducer} from './Reducers/registration-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown,any>