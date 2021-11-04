type InitialStateType = {
}

type ActionsType = {}

const initialState = {

}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action) {
        case '':
            return {
                ...state

            }
        default:
            return state
    }
}





