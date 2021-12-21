import {Dispatch} from 'redux';
import {authApi, CardsPackType} from '../../m3-dal/auth-api';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {packsApi, RequestParamsType} from '../../m3-dal/packs-api';


const initialState = {
    cardPacks: [] as Array<CardsPacksType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    min: 0,
    max: 100,
    portionSize: 7,
    myPacks: false,
    search: '',
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'Packs/SET-PACKS':
            return {
                ...state,
                ...action.payload,
                // cardPacks: action.packs
            }
        case 'Packs/ADD-PACK':
            return {
                ...state,
                cardPacks: [...state.cardPacks, action.newPack]
            }
        case 'Packs/DELETE-PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.filter(p => p.user_id !== action.userId)
            }
        case 'packs/SET-MY-PACKS':
            return {
                ...state,
                myPacks: action.myPacks
            };
        case 'packs/SET-USER-ID':
            return {
                ...state,
                user_id: action.userId
            };
        case 'packs/SET-PAGE':
            return {
                ...state,
                page: action.page
            };
        case 'packs/SET-PAGE-COUNT':
            return {
                ...state,
                pageCount: action.pageCount
            };
        default:
            return state
    }
}

//actionCreators
export const setPacksAc = (payload: PacksType) => ({type: 'Packs/SET-PACKS', payload} as const)
export const addPackAc = (newPack: any) => ({type: 'Packs/ADD-PACK', newPack} as const)
export const deletePackAc = (userId: string) => ({type: 'Packs/DELETE-PACK', userId} as const)
export const setMyPacksAC = (myPacks: boolean) => ({type: 'packs/SET-MY-PACKS', myPacks} as const)
export const setUserIdAC = (userId: string) => ({type: 'packs/SET-USER-ID', userId} as const)
export const setPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'packs/SET-PAGE-COUNT', pageCount} as const)


//thunks

// export const getPacksTC = (sortValues?: SortValuesType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         let newPacks = await authApi.getPacks(sortValues)
//         dispatch(setPacksAc(newPacks.data.cardPacks))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (e) {
//
//     }
// }

export const getPacksTC = (params: RequestParamsType, sortValues?: SortValuesType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const userId = getState().profile._id
        const {myPacks, pageCount, search, min, max} = getState().packs

        if (myPacks) {
            params = {...params, user_id: userId}
        }
        if (params.packName === undefined) {
            params = {...params, packName: search}
        }
        if (!params.min && !params.max) {
            params = {...params, min, max}
        }
        if (!params.pageCount) {
            params = {...params, pageCount}
        }
        let data = await packsApi.getPacks(params)
        dispatch(setPacksAc(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {

    }
}

export const addPackTC = (newPackValue?: CardsPackType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.addPack().then(
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
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType = ReturnType<typeof setPacksAc>
    | ReturnType<typeof addPackAc>
    | ReturnType<typeof deletePackAc>
    | ReturnType<typeof setMyPacksAC>
    | ReturnType<typeof setUserIdAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | SetAppStatusActionType

export type SortValuesType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
    user_id?: string
}

export type PacksType = {
    cardPacks: Array<CardsPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardsPacksType = {
    _id: string
    user_id: string
    name: string
    user_name: string
    path: string
    cardsCount: string
    grade: string
    shots: string
    rating: string
    type: string
    created: Date
    updated: Date
    _v: string
}

//other info






