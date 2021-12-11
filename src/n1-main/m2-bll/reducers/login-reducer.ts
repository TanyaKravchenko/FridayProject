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

type ActionsType = ReturnType<typeof setIsLoggedInAC>






