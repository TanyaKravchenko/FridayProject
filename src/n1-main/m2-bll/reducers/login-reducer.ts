import {authApi, LoginDataType} from "../../m3-dal/auth-api";
import {Dispatch} from "react";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {ProfileDataType, setProfileDataAC, SetProfileDataActionType} from "./profile-reducer";
import {setErrorAC} from "./registration-reducer";

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


export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        let res = await authApi.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
        const profileData = {
            name: res.data.name,
            avatar: res.data.avatar,
            verified: res.data.verified
        } as ProfileDataType
        dispatch(setProfileDataAC(profileData))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        let res = await authApi.logOut()
        console.log(res)
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("succeeded"))

    }

}





