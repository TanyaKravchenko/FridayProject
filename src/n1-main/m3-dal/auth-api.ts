import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    withCredentials: true,
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
})

export const authApi = {
    me() {
        return instance.post('auth/me', {}).then(res => res.data)
    },
    register(data: RegisterParamsType) {
        return instance.post('/auth/register', data).then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType>>('auth/login', data)
    },
    logOut() {
        return instance.delete<LogOutResponseType>(`auth/me`);
    },
    forgot(data:ForgotDataType){
        return instance.post<ForgotDataType, AxiosResponse<ForgotResponseType>>('auth/forgot', data)
    },
}

//types
export type RegisterParamsType = {
    email: string
    password: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseType = {
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

export type ForgotResponseType ={
    info: string
    error: string
}

// {
//     _id: string;
//     email: string;
//     name: string;
//     avatar?: string;
//     publicCardPacksCount: number; // количество колод
//
//     created: Date;
//     updated: Date;
//     isAdmin: boolean;
//     verified: boolean; // подтвердил ли почту
//     rememberMe: boolean;
//
//     error?: string;
// }

// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }