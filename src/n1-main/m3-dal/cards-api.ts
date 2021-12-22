import {instance} from './auth-api';

export const cardsApi = {
    getCards(params: RequestCardsParamsType) {
        return instance.get<OneCardType>('/cards/card', {params}).then(res => res.data)
    },
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