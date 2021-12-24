import {ForgotDataType, ForgotResponseType, instance} from './auth-api';
import {AxiosResponse} from "axios";

export const cardsApi = {
    getCards(params: RequestCardsParamsType) {
        return instance.get<ResponseCardsType>('cards/card', {params}).then(res => res.data)
    },
     addCard(newCardData:addCardType) {
        return instance.post<addCardType, AxiosResponse<OneCardType>>('/cards/card', {card:newCardData})
    },
    deleteCard(cardId:string){
        return instance.delete(`/cards/card?id=${cardId}`)
    }
}

//types
export type OneCardType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    questionImg: string,
    answerImg: string,
    answerVideo: string,
    questionVideo: string,
    comments: string,
    type: string,
    rating: number,
    more_id: string,
    created: string,
    updated: string,
    __v: number
}
export type RequestCardsParamsType = {
    cardAnswer?: string// не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string // id юзера
    min?: number// не обязательно
    max?: number // не обязательно
    sortCards?: number // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
}
export type addCardType = {
    cardsPack_id:string,
    question:string,
    answer:string,
    grade?:number,
    shots?: number,
    rating?: number,
    answerImg?:string,
    questionImg?:string,
    answerVideo?:string,
    type?:string
}

export type ResponseCardsType = {
    cards: CardType []
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: TypeType
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type TypeType = 'card' | 'pack'