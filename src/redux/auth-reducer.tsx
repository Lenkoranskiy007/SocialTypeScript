import {authAPI, securityAPI, usersAPI} from "../Api/Api";
import * as formik from "formik";
import {useFormik} from "formik";
import {Dispatch} from "redux";

const SET_USER_DATA =  'SET_USER_DATA '
const GET_CAPTCHA_URL_SUCCESS =  'GET_CAPTCHA_URL_SUCCESS '
type DataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}



type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    data: DataType
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof  GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}



type InitialStateType = {
    userId:   number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}



export const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return{
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return  {
                ...state,
                ...action.payload
            }
        }
        default :
            return state
    }
}


export const setUserDataActionCreator = (userId: number | null, email: string | null, login: string | null, isAuth: boolean | null ) :SetUserDataActionType  => {
    return {type: SET_USER_DATA, data: {userId, email, login , isAuth}}
}


const getCaptchaUrlSuccessAC = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    const response =  await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))

}

export const getAuthUserData = () => (dispatch: Dispatch) => {
      return  authAPI.me().then((response: any) => {
            if (response.data.resultCode  === 0 ) {
                let {id, email, login} = response.data.data
                dispatch(setUserDataActionCreator(id, email, login, true))
            }
        })

}



export const loginTC = (email: string, password: number, rememberMe: boolean, captcha: string) => {
    return async (dispatch: Dispatch) => {
           let response =  await authAPI.login(email, password, rememberMe,captcha)
            if (response.data.resultCode === 0 ) {
                // @ts-ignore
                dispatch(getAuthUserData())
            } else if(response.data.resultCode === 10 ) {
                // @ts-ignore
                dispatch(getCaptchaUrlTC())
            }
        }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout().then((response: any) => {
            if (response.data.resultCode  === 0 ) {
                dispatch(setUserDataActionCreator(null , null, null, false))
            }
        })
    }
}




