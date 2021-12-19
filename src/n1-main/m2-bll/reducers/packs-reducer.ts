import {Dispatch} from "redux";
import {authApi, OneCardPacksType} from "../../m3-dal/auth-api";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {RootStateType} from "../store";


let initialState = {

    packs: [] as OneCardPacksType[],
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Packs/SET-PACKS":
            return {...state, packs: action.newPacks}
        default:
            return state
    }
}

//actionCreators

export const setPacksAc = (newPacks: OneCardPacksType[]) => ({type: 'Packs/SET-PACKS', newPacks} as const)


//thunks
export const getPacksTC = () => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
       let newPacks =  await authApi.getPacks()
        dispatch(setPacksAc(newPacks.data.cardPacks))
    } catch (e) {
        
    }
}

//types
export type SetPacksActionType = ReturnType<typeof setPacksAc>
type ActionsType = SetPacksActionType | SetAppStatusActionType
export type SortValuesType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
    user_id?: string
}
type InitialStateType = typeof initialState





