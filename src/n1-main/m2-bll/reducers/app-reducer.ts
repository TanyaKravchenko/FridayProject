const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':

        case 'APP/SET-ERROR':


        case 'APP/SET-IS-INITIALIZED':

        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

//type
export type AppInitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>
export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedAC





