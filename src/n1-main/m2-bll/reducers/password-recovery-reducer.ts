import {authApi, ForgotDataType} from "../../m3-dal/auth-api";
import {Dispatch} from "react";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";

const initialState = {
    isSentEmail: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'forgot/SET-IS-SENT-EMAIL':
            return {
                ...state, isSentEmail: action.value
            }
        default:
            return state
    }
}

export const setIsSentEmailAC = (value: boolean) =>
    ({type: 'forgot/SET-IS-SENT-EMAIL', value} as const)

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsSentEmailAC> | SetAppStatusActionType


export const passwordRecoveryTC = (data: ForgotDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authApi.forgot(data)
        .then(res => {
            console.log(res)
            setIsSentEmailAC(true)

        })
        .catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
    .finally(() =>{ dispatch(setAppStatusAC("succeeded"))  })

}

