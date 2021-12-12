


const initialState = {
    profileData: {
        name: 'Crazy Kid',
        avatar: 'http://www.dumpaday.com/wp-content/uploads/2013/08/Barbie-Bootcamp.jpg',
        verified: false,
    }

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

//types
export type ProfileDataType = {
    name: string
    avatar: string
    verified:boolean
}
export type SetProfileDataActionType= ReturnType<typeof setProfileDataAC>

type ActionsType = SetProfileDataActionType

type InitialStateType = typeof initialState





