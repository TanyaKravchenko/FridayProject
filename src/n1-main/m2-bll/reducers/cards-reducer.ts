import {Dispatch} from 'redux';
import {setAppStatusAC} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {cardsApi, OneCardType, RequestCardsParamsType} from "../../m3-dal/cards-api";

const initialState = {
    cards: [] as Array<OneCardType>,

}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

//actionCreators
export const setCardsAc = (payload: OneCardType) => ({type: 'cards/SET-CARDS', payload} as const)


//thunks
export const getCardsTC = (params: RequestCardsParamsType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let data = await cardsApi.getCards(params)
        dispatch(setCardsAc(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    }
}

// export const addPackTC = (cardsPack: CreateCardsPackType): ThunkType => (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     packsApi.addPack(cardsPack).then(
//         () => {
//             dispatch(getPacksTC({}))
//             dispatch(setAppStatusAC('succeeded'))
//         }
//     ).catch(() => {
//         dispatch(setAppStatusAC('failed'))
//     }).finally(() => [
//         dispatch(setAppStatusAC('succeeded'))
//     ])
// }
// export const deletePackTC = (userId: string): ThunkType => async (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     packsApi.deletePack(userId).then(
//         () => {
//             dispatch(deletePackAc(userId))
//             dispatch(getPacksTC({}))
//             dispatch(setAppStatusAC('succeeded'))
//         }
//     ).catch(() => {
//         dispatch(setAppStatusAC('failed'))
//     }).finally(() => [
//         dispatch(setAppStatusAC('succeeded'))
//     ])
// }

//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType = ReturnType<typeof setCardsAc>







