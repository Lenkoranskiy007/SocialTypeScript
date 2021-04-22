import axios from "axios";
import {profileAPI, ResultCodeEnum, usersAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";

let ADD_POST = 'ADD-POST'
let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
let SET_USER_PROFILE = 'SET_USER_PROFILE'
let SET_STATUS = 'SET_STATUS'
let SAVE_PHOTO = 'SAVE_PHOTO'


type AddPostActionType = {
    type: typeof ADD_POST
}

type UpdateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

type SavePhotoActionType = {
    type: typeof SAVE_PHOTO
    photos: any
}


// type InitialStateType = {
//     posts: Array<PostsType>
//     newPostText: string
//     profile: ProfileType
//     status: string
//
// }

type PostsType = {
    id: number
    message: string
    likesCount: string
}
type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string

}

let initialState = {
    posts: [
        {id: 1, message: 'How are you', likesCount: '15'},
        {id: 2, message: "It's my first project men", likesCount: '20'}
    ] as Array<PostsType>,
    newPostText: 'Just do it',
    profile: null as ProfileType | null,
    status: ''

}

export type ProfilePageInitialStateType = typeof initialState

type ActionTypes = AddPostActionType | UpdateNewPostTextActionType
    | SetUserProfileActionType | SetStatusActionType
    | SavePhotoActionType

export const profileReducer = (state = initialState, action: any): ProfilePageInitialStateType => {
    switch (action.type) {
        case  ADD_POST: {


            let copyState = {...state}
            let newPost = {id: 4, message: state.newPostText, likesCount: "0"}
            copyState.posts = [...state.posts]
            copyState.posts.push(newPost)
            copyState.newPostText = ''
            return copyState
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state}
            stateCopy.newPostText = action.newText
            return stateCopy
        }
        case SET_USER_PROFILE: {
            let copyState = {...state}
            copyState.profile = action.profile
            return copyState
        }
        case SET_STATUS: {
            // return {
            //     ...state,
            //     status: action.status
            // }
            let stateCopy = {...state}
            stateCopy.status = action.status
            return stateCopy
        }
        case SAVE_PHOTO:
            debugger
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }


        default: {
            return state
        }
    }
}


export const addPostActionCreator = (): AddPostActionType => {
    return {type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionType => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export const setUserProfileActionCreator = (profile: ProfileType): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
}

export const setStatusActionCreator = (status: string): SetStatusActionType => {
    return {type: SET_STATUS, status}
}

const savePhotoAC = (photos: PhotosType): SavePhotoActionType => {
    return {type: SAVE_PHOTO, photos}
}


export const getProfileTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        usersAPI.getProfile(userId).then((response: any) => {
            dispatch(setUserProfileActionCreator(response.data))
        })
    }
}


export const getStatusTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId).then((response: any) => {
            dispatch(setStatusActionCreator(response.data))
        })
    }
}

export const updateStatusTC = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then((response: any) => {
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setStatusActionCreator(status))
            }
        })
    }
}

export const savePhotoTC = (file: string) => {
    return async (dispatch: Dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(savePhotoAC(response.data.data.photos))
        }
        //
        // profileAPI.savePhoto(file).then(response => {
        //     if(response.data.resultCode === 0 ) {
        //         dispatch(savePhotoAC(response.data.data.photos))
        //     }
        // })


    }
}

export const saveProfileTC = (profile: ProfileType) => {
    return async (dispatch: Dispatch, getState:() => AppStateType) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            // @ts-ignore
            dispatch(getProfileTC(userId))
        }
    }
}
