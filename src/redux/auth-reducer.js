import {authAPI, securityAPI, usersAPI} from "../Api/Api";
import * as formik from "formik";
import {useFormik} from "formik";

const SET_USER_DATA =  'SET_USER_DATA '
const GET_CAPTCHA_URL_SUCCESS =  'GET_CAPTCHA_URL_SUCCESS '

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action) => {
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


export const setUserDataActionCreator = (userId, email, login, isAuth ) => {
    return {type: SET_USER_DATA, data: {userId, email, login , isAuth}}
}


const getCaptchaUrlSuccessAC = (captchaUrl) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
}

export const getCaptchaUrlTC = () => async (dispatch) => {
    const response =  await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))

}

export const getAuthUserData = () => (dispatch) => {
      return  authAPI.me().then(response => {
            if (response.data.resultCode  === 0 ) {
                let {id, email, login} = response.data.data
                dispatch(setUserDataActionCreator(id, email, login, true))
            }
        })

}



export const loginTC = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
           let response =  await authAPI.login(email, password, rememberMe,captcha)
            if (response.data.resultCode === 0 ) {
                dispatch(getAuthUserData())
            } else if(response.data.resultCode === 10 ) {
                dispatch(getCaptchaUrlTC())
            }
        }
}

export const logoutTC = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode  === 0 ) {
                dispatch(setUserDataActionCreator(null, null, null, false))
            }
        })
    }
}




