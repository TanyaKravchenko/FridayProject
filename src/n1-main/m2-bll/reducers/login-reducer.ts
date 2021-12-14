import {authApi, LoginDataType} from "../../m3-dal/auth-api";
import {Dispatch} from "react";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {ProfileDataType, setProfileDataAC, SetProfileDataActionType} from "./profile-reducer";

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

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetProfileDataActionType

//thunks
export const loginTC = (data:LoginDataType) => (dispatch:Dispatch<ActionsType>)=> {
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            console.log(res)
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
            const profileData= {
                name:res.data.name,
                avatar:res.data.avatar,
                verified:res.data.verified
            } as ProfileDataType
            dispatch(setProfileDataAC(profileData))
        }).catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
}

export const logoutTC = () => (dispatch:Dispatch<ActionsType>)=> {
    dispatch(setAppStatusAC("loading"))
    authApi.logOut()
        .then(res => {
            console.log(res)
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))

        }).catch(e => e.response ? e.response.data.error : (e.message + ', more details in the console'))
}





