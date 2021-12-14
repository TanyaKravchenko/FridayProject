import {Dispatch} from "react";
import {authApi} from "../../m3-dal/auth-api";
import {AppActionsType, setAppStatusAC} from "./app-reducer";


const initialState = {
    profileData: null as ProfileDataType | null,

}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE-DATA':
            return {...state, profileData: action.data}
        default:
            return state
    }
}

//actionCreators
export const setProfileDataAC = (data:ProfileDataType)=>{
    return({type:'PROFILE/SET-PROFILE-DATA', data} as const)
}


//thunks

export const authMeTC = () => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC("loading"))

    try {
        let res = await authApi.me()
        console.log(res)

    }catch (e) {

    }finally {

    }
}











//types
export type ProfileDataType = {
    name: string
    avatar: string
    verified:boolean
}
export type SetProfileDataActionType= ReturnType<typeof setProfileDataAC>

type ActionsType = SetProfileDataActionType

type InitialStateType = typeof initialState





