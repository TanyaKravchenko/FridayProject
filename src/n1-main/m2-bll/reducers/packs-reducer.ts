import {Dispatch} from "redux";
import {authApi, CardsPackType, OneCardPacksType} from "../../m3-dal/auth-api";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {RootStateType} from "../store";
import {ThunkAction} from "redux-thunk";


let initialState = {

    packs: [] as OneCardPacksType[],
    sortValues: {
        packName: '',
        sortPacks: '0updated',
    } as SortValuesType
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Packs/SET-PACKS":
            return {...state, packs: action.packs}
        case "Packs/ADD-PACK":
            return {...state, packs: [...state.packs, action.newPack]}
        case "Packs/DELETE-PACK":
            return {...state, packs: state.packs.filter(p => p.user_id !== action.userId)}
        case "Packs/SET-VALUE-SEARCH":
            return {...state, sortValues: {...state.sortValues, packName: action.value}}
        case "Packs/SORT-PACKS":
            return {...state, sortValues: {...state.sortValues, sortPacks: action.value}}
        default:
            return state
    }
}

//actionCreators

export const setPacksAc = (packs: OneCardPacksType[]) => ({type: 'Packs/SET-PACKS', packs} as const)
export const addPackAc = (newPack: OneCardPacksType) => ({type: 'Packs/ADD-PACK', newPack} as const)
export const deletePackAc = (userId: string) => ({type: 'Packs/DELETE-PACK', userId} as const)
export const setValueSearchAC = (value: string) => ({type: 'Packs/SET-VALUE-SEARCH', value} as const)
export const sortPacksAC = (value: string) => ({type: 'Packs/SORT-PACKS', value} as const)


//thunks
export const getPacksTC = (sortValues: SortValuesType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let newPacks = await authApi.getPacks(sortValues)
        dispatch(setPacksAc(newPacks.data.cardPacks))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {

    }
}

export const addPackTC = (newPackValue?: CardsPackType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.addPack(newPackValue).then(
        () => {
            dispatch(getPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    }).finally(() => [
        dispatch(setAppStatusAC('succeeded'))
    ])
}
export const deletePackTC = (userId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.deletePack(userId).then(
        () => {
            dispatch(deletePackAc(userId))
            dispatch(getPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    }).finally(() => [
        dispatch(setAppStatusAC('succeeded'))
    ])
}


//types
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
export type SetPacksActionType = ReturnType<typeof setPacksAc>
export type AddPacksActionType = ReturnType<typeof addPackAc>
export type DeletePacksActionType = ReturnType<typeof deletePackAc>
export type SetValueSearchActionType = ReturnType<typeof setValueSearchAC>
export type SortPacksActionType = ReturnType<typeof sortPacksAC>
type ActionsType =
    SetPacksActionType
    | SetAppStatusActionType
    | AddPacksActionType
    | DeletePacksActionType
    | SetValueSearchActionType
    | SortPacksActionType
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






