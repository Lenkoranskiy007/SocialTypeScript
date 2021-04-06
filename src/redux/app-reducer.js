import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED =  'SET_INITIALIZED'

const initialState = {
    initialized: false

}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED:
            return  {
            ...state,
                initialized: true
        }
        default:
            return state
    }

}

const initializedSuccessAC = () => {
    return {type: SET_INITIALIZED}
}

export const initializeAppTC = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccessAC())
    })
}