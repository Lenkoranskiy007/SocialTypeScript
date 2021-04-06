import * as axios from "axios";
import {profileAPI, usersAPI} from "../Api/Api";
import {Dispatch} from "redux";

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
    profile: any
}

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

type SavePhotoActionType = {
    type: typeof SAVE_PHOTO
    photos: any
}


type InitialStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile: any
    status: string

}

type PostsType = {
    id: number
    message: string
    likesCount: string
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'How are you', likesCount: '15'},
        {id: 2, message: "It's my first project men", likesCount: '20'}
    ],
    newPostText: 'Just do it',
    profile: null,
    status: ''

}

type ActionTypes = AddPostActionType | UpdateNewPostTextActionType
    | SetUserProfileActionType | SetStatusActionType
    |SavePhotoActionType

export const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                profile: {...state.profile, photos: action.photos}
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

export const setUserProfileActionCreator = (profile: any): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
}

export const setStatusActionCreator = (status: string): SetStatusActionType => {
    return {type: SET_STATUS, status}
}

const savePhotoAC = (photos: any): SavePhotoActionType => {
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
            if (response.data.resultCode === 0) {
                dispatch(setStatusActionCreator(status))
            }
        })
    }
}

export const savePhotoTC = (file: any) => {
    return async (dispatch: Dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
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

export const saveProfileTC = (profile: any) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getProfileTC(userId))
        }
    }
}
