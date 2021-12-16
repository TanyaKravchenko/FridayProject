import {authApi, ForgotDataType, SetNewPasswordDataType} from '../../m3-dal/auth-api';
import {Dispatch} from 'react';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';

const initialState = {
    isSentEmail: false,
    isSetPassword: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'set-new-password/SET-PASSWORD':
            return {
                ...state, isSetPassword: action.value
            }
        case 'forgot/SET-IS-SENT-EMAIL':
            return {
                ...state, isSentEmail: action.value
            }
        default:
            return state
    }
}

//actionCreators
export const setIsSentEmailAC = (value: boolean) =>
    ({type: 'forgot/SET-IS-SENT-EMAIL', value} as const)
export const setPasswordAC = (value: boolean) =>
    ({type: 'set-new-password/SET-PASSWORD', value} as const)

export const passwordRecoveryTC = (data: ForgotDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.forgot(data)
        .then(res => {
        })
        .catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

//thunks
export const newPasswordTC = (data: SetNewPasswordDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.setNewPassword(data)
        .then(res => {
            console.log(res.data.password)
        })
        .catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

//type
type InitialStateType = typeof initialState
type ActionsType =
    ReturnType<typeof setIsSentEmailAC> |
    ReturnType<typeof setPasswordAC> |
    SetAppStatusActionType
