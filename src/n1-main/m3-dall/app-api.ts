import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: "http://localhost:7542/2.0/",
})

export const authApi = {
    me() {}

}

//types
// export type RegisterParamsType = {
//     email:string
//     password:string
// }
//
// export type LoginDataType = {
//     email:string
//     password:string
//     rememberMe: boolean
// }
//
// export type ForgotDataType = {
//     email: string
//     from: string
//     message: string
// }