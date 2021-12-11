import {authApi, LoginDataType} from "../../m3-dall/app-api";
import {Dispatch} from "react";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";

const initialState = {
    isLoggedIn: false
}


export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
                return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actionCreators
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//type
type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType


//thunks


export const loginTC = (data:LoginDataType) => (dispatch:Dispatch<ActionsType>)=> {
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            console.log(res)
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        }).catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
}





