import {ProfileType} from "../../m3-dal/auth-api";
import {SetAppStatusActionType} from "./app-reducer";


const initialState = {
    // profileData: null as ProfileDataType| null,
    user:null as ProfileType | null,
    profileError:''

}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER-DATA':
            return {...state, user: action.userData}
        case 'PROFILE/SET-ERROR':
            return {...state, profileError: action.errorValue}
        default:
            return state
    }
}

//actionCreators
export const setUserDataAC = (userData:ProfileType)=>{
    return({type:'PROFILE/SET-USER-DATA', userData} as const)
}
 const setErrorAc = (errorValue: string) => ({type: 'PROFILE/SET-ERROR', errorValue} as const)

//types
export type ProfileDataType = {
    name: string
    avatar: string
    verified:boolean
}
export type SetUserDataActionType= ReturnType<typeof setUserDataAC>

type ActionsType = SetUserDataActionType  | SetAppStatusActionType | ReturnType<typeof setErrorAc>

type InitialStateType = typeof initialState





