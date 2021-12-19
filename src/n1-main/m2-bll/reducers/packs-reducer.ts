import {Dispatch} from "redux";
import {authApi, CardsPackType, OneCardPacksType} from "../../m3-dal/auth-api";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {RootStateType} from "../store";
import { ThunkAction } from "redux-thunk";


let initialState = {

    packs: [] as OneCardPacksType[],
    sortValues:{} as SortValuesType
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Packs/SET-PACKS":
            return {...state, packs: action.packs}
        case "Packs/ADD-PACK":
            return {...state, packs: [...state.packs, action.newPack]}
        default:
            return state
    }
}

//actionCreators

export const setPacksAc = (packs: OneCardPacksType[]) => ({type: 'Packs/SET-PACKS', packs} as const)
export const addPackAc = (newPack: OneCardPacksType) => ({type: 'Packs/ADD-PACK', newPack} as const)


//thunks
export const getPacksTC = (sortValues?:SortValuesType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
       let newPacks =  await authApi.getPacks(sortValues)
        dispatch(setPacksAc(newPacks.data.cardPacks))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        
    }
}

export const addPackTC = (newPackValue?:CardsPackType):ThunkType => async (dispatch ) => {
    dispatch(setAppStatusAC('loading'))
        authApi.addPack(newPackValue).then(
            ()=>{
                dispatch(getPacksTC())
                dispatch(setAppStatusAC('succeeded'))
            }
        ).catch(()=>{
            dispatch(setAppStatusAC('failed'))
        }).finally(()=>[
            dispatch(setAppStatusAC('succeeded'))
        ])



}



//types
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
export type SetPacksActionType = ReturnType<typeof setPacksAc>
export type AddPacksActionType = ReturnType<typeof addPackAc>
type ActionsType = SetPacksActionType | SetAppStatusActionType | AddPacksActionType
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


//other info






