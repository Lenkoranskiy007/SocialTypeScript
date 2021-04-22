import React from 'react'
import  axios from "axios";
import { PhotosType, ProfileType } from '../types/types';


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
     'API-KEY': 'b6a2753a-cce4-4557-b52f-9156d221ff98'
    }
})


type UsersGetType = {
    items: Array<string>
    totalCount: number
    error: string
}

export type UsersPostDeleteType = {
    resultCode: number
    messages: Array<string>
    data: {}
}





export  const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        const promise = instance.get<UsersGetType>(`users?page=${currentPage}&count=${pageSize}&term=${term} ` + (friend === null ? '' : `&friend=${friend}`)  ).then(res => {
            return res.data
        })
        return promise
    },
    unfollow(id: number) {
        const promise = instance.delete<UsersPostDeleteType>(`follow/${id}`).then(res => {
            return res.data
        })
        return promise

    },
    follow(id: number) {
        const promise = instance.post<UsersPostDeleteType>(`follow/${id}`).then(res => {
            return res.data
        })
        return promise
    },
    getProfile(userId: number) {
        console.warn('Obsolete method profileAPI object')
      // const promise = profileAPI.getProfile(userId)
      // return promise
        return profileAPI.getProfile(userId)
    }


}


type ProfileGetPostStatusType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type ProfilePhotoStatusType = {
    resultCode: number
    messages: Array<string>
    data: {
     
      photos: PhotosType
    }
}




export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
        // const promise = instance.get(`profile/` + userId).then(res => {
        //     return res.data
        // })
        // return promise
    },
    getStatus(userId: number) {
        return instance.get<ProfileGetPostStatusType>(`profile/status/` + userId)
        // const promise =  instance.get(`profile/status/` + userId).then(res => {
        //     return res.data
        // })
        // return promise
    },
    updateStatus(status: string) {
        return instance.put<ProfileGetPostStatusType>(`profile/status`, {status: status})
        // const promise = instance.put(`profile/status`, {status: status}).then(res => {
        //     return res.data
        // })
        // return promise

    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image',photoFile)
        return instance.put<ProfilePhotoStatusType>(`/profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form/data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ProfileGetPostStatusType>(`profile/`, profile)
    }
}


type ResponseType<D = {}, RC = ResultCodeEnum | ResultCodeCaptcha> ={
    data: D
    messages: Array<string>
    resultCode: RC
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export enum ResultCodeEnum  {
    Success = 0,
    Error = 1
}

export enum ResultCodeCaptcha {
    Captcha = 10
}



export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
    },
    login(email: string, password: number, rememberMe: boolean, captcha: string) {
        return instance.post<ResponseType<LoginResponseDataType>>(`auth/login` , {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login` )
    }
}


export const securityAPI = {
   getCaptchaUrl() {
     return instance.get(`security/get-captcha-url`)
   }
}










