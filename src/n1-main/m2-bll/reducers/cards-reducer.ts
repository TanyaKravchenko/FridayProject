import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {addCardType, cardsApi, OneCardType, RequestCardsParamsType} from "../../m3-dal/cards-api";

const initialState = {
    cards: [] as Array<OneCardType>,

}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state,
                ...action.cards,
            }
        case "cards/ADD-CARD":
            return {...state, cards: [...state.cards, action.newCard]}

        default:
            return state
    }
}

//actionCreators
export const setCardsAc = (cards: OneCardType[]) => ({type: 'cards/SET-CARDS', cards} as const)
export const addCardAc = (newCard: OneCardType) => ({type: 'cards/ADD-CARD', newCard} as const)


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
export const addCardTC = (newCard: addCardType): ThunkType =>(dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.addCard(newCard).then(
        (res) => {
            dispatch(getCardsTC({cardsPack_id:newCard.cardsPack_id}))
            dispatch(addCardAc(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    }).finally(() => {
        dispatch(setAppStatusAC('succeeded'))
    })
}
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
type ActionsType = ReturnType<typeof setCardsAc> | ReturnType<typeof addCardAc> | SetAppStatusActionType







