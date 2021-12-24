import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {addCardType, cardsApi, OneCardType, ResponseCardsType} from '../../m3-dal/cards-api';

const initialState = {
    cards: [] as Array<OneCardType>,
    packId: ''

}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state,
                ...action.cards,
            }
        case 'cards/ADD-CARD':
            return {...state, cards: [...state.cards, action.newCard]}
        case 'cards/SET-PACK-ID':
            return {...state, packId: action.packId}
        case 'cards/DELETE-CARD':
            return {...state, cards: state.cards.filter(c => c._id !== action.cardId)}
        default:
            return state
    }
}

//actionCreators
export const setCardsAc = (cards: ResponseCardsType) => ({type: 'cards/SET-CARDS', cards} as const)
export const addCardAc = (newCard: OneCardType) => ({type: 'cards/ADD-CARD', newCard} as const)
export const setPackIdAc = (packId: string) => ({type: 'cards/SET-PACK-ID', packId} as const)
export const deleteCardAc = (cardId: string) => ({type: 'cards/DELETE-CARD', cardId} as const)


//thunks
export const getCardsTC = (id: string) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const packId = getState().cards.packId
        const params = {cardsPack_id: id,}
        let data = await cardsApi.getCards(params)
        dispatch(setCardsAc(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    }
}
export const addCardTC = (newCard: addCardType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.addCard(newCard).then(
        (res) => {
            dispatch(addCardAc(res.data))
            dispatch(getCardsTC(newCard.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    })
    // .finally(() => {
    // dispatch(setAppStatusAC('succeeded'))
    // })
}
export const deleteCardTC = (packId: string, cardId: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.deleteCard(cardId).then(
        () => {
            dispatch(deleteCardAc(cardId))
            dispatch(getCardsTC(packId))
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
type ActionsType =
    ReturnType<typeof setCardsAc>
    | ReturnType<typeof addCardAc>
    | SetAppStatusActionType
    | ReturnType<typeof setPackIdAc>
    | ReturnType<typeof deleteCardAc>







