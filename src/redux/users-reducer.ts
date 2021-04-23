import {ResultCodeEnum, usersAPI} from "../Api/Api";
import * as axios from "axios";
import {PhotosType} from "../types/types";
import {Dispatch} from "redux";

let FOLLOW = 'FOLLOW'
let UNFOLLOW = 'UNFOLLOW'
let SET_USERS = 'SET_USERS'
let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
let SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
let SET_FILTER = 'SET_FILTER'


    type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number

}


type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}


type SetUsersActionType = {
    type: typeof SET_USERS
    users: UsersType
}


type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number

}

type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    count: number
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}


type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    totalCount: number
    error: string
}


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
      term: '',
      friend: null as null | boolean
    }
}


type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

// type ActionTypes = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType| SetCurrentPageActionType |
//     SetTotalCountActionType | ToggleIsFetchingActionType | ToggleIsFollowingProgressActionType




export const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u

                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u

                })
            }
        case  SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: any) => id != action.userId)
            }
        }
        case SET_FILTER: {
          return {
              ...state, 
              filter: action.payload
          }   
        }
        
        
        default:
            return state
    }

}


export const followSuccessAC = (userId: number): FollowSuccessActionType => {
    return {type: FOLLOW, userId}
}


export const unFollowSuccessAC = (userId: number): UnFollowSuccessActionType => {
    return {type: UNFOLLOW, userId}
}


export const setUsersAC = (users: UsersType): SetUsersActionType => {
    return {type: SET_USERS, users}
}


export const setCurrentPageAC = (currentPage: number): SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}


export const setTotalCountAC = (totalCount: number): SetTotalCountActionType => {
    return {type: SET_TOTAL_COUNT, count: totalCount}
}


export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}


export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

export const setFilter = (filter: FilterType) => {
   return {type: SET_FILTER, payload: filter}
}
 


export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterType) => {    //Получение Пользователей со страницы исходя из номера страницы 
    return (dispatch: Dispatch) => { 
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend).then((data: any) => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setCurrentPageAC(currentPage))
            dispatch(setFilter(filter))
            dispatch(setUsersAC(data.items))
            dispatch(setTotalCountAC(data.totalCount))
        })
    }
}

export const unfollowTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then((data: any) => {
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(unFollowSuccessAC(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}
export const followTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.follow(userId).then((data: any) => {
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(followSuccessAC(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}




