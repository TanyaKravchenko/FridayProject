import axios, {AxiosResponse} from 'axios';
import {SortValuesType} from "../m2-bll/reducers/packs-reducer";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'http://localhost:7542/2.0/',

})

let defaultAvatar = 'https://image.shutterstock.com/image-photo/indy-musician-guitarist-pug-dogfunny-260nw-688080844.jpg';

export const authApi = {
    me() {
        return instance.post<ProfileType>('auth/me', {}).then(res => res.data)
    },
    register(data: RegisterParamsType) {
        return instance.post('/auth/register', data).then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ProfileType>>('auth/login', data)
    },
    logOut() {
        return instance.delete<LogOutResponseType>(`auth/me`);
    },
    forgot(data: ForgotDataType) {
        return instance.post<ForgotDataType, AxiosResponse<ForgotResponseType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordDataType) {
        return instance.post<ForgotDataType, AxiosResponse<SetNewPasswordDataType>>('auth/set-new-password', data)
    },
    updateUser(name: string | null, avatar: string = 'https://image.shutterstock.com/image-photo/indy-musician-guitarist-pug-dogfunny-260nw-688080844.jpg') {
        return instance.put<{ name: string, avatar: string }, AxiosResponse<ProfileType>>('auth/me', {name, avatar})
    },
    getPacks(sortValues?: SortValuesType) {
        return instance.get<PacksResponseType>('/cards/pack', {params: {min:0, max:10, pageCount:10}})
    },
    addPack(cardsPack?:CardsPackType){
        return instance.post<CardsPackType,AxiosResponse<OneCardPacksType>>('/cards/pack', {
            cardsPack:{
                name:'HardCode user',
                path:'/def',
                private:false,
                type:'pack'
            }
        })
    },
}
export type CardsPackType = {
    name:string,
    path:string,
    grade?:number,
    shots?:number,
    rating?:number,
    deckCover?:string,
    private:boolean,
    type:string
}

//types
export type RegisterParamsType = {
    email: string
    password: string
    error?: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type LogOutResponseType = {
    info: string,
    error: string
}

export type ForgotDataType = {
    email: string
    from: string
    message: string
}

export type SetNewPasswordDataType = {
    password: string
    resetPasswordToken: string

}

export type ForgotResponseType = {
    info: string
    error: string
}


export type OneCardPacksType = {
    cardsCount: string,
    created: string,
    deckCover:null | string,
    grade: number,
    more_id:string,
    name: string,
    path: string,
    private:boolean,
    rating:number,
    shots:number,
    type: string,
    updated: string,
    user_id:string,
    user_name:string,
      __v: number,
    _id:string
}

export type PacksResponseType = {
    cardPacks: OneCardPacksType[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number
}

