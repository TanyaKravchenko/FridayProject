const initialState = {

}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action) {
        case '':
            return {
                ...state

            }
        default:
            return state
    }
}

//type

type InitialStateType = {}

type ActionsType = {}




