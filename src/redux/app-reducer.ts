import {getAuthUserData} from "./auth-reducer";
import {Dispatch} from "redux";

const SET_INITIALIZED = 'SET_INITIALIZED'
type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED
}

type InitialStateType = {
    initialized: boolean
}

const initialState = {
    initialized: false

}

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }

}

const initializedSuccessAC = (): InitializedSuccessActionType => {
    return {type: SET_INITIALIZED}
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    let promise = dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccessAC())
    })
}