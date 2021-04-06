let ADD_MESSAGE = 'ADD-MESSAGE'
let UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, name: 'Farid'},
        {id: 2, name: 'Sudjaat'},
        {id: 3, name: 'Rufat'},
        {id: 4, name: 'Adam'},
        {id: 5, name: 'Tamerlan'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How do you do?'},
        {id: 3, message: "It's my first project men!"}
    ],
    newMessageText: 'Hi bro'

}

export const dialogsReducer = (state = initialState, action) => {
    let stateCopy
    switch (action.type) {
        case ADD_MESSAGE: {
            stateCopy = {...state}
            let newMessage = {id: 4, message: state.newMessageText}
            stateCopy.messages = [...state.messages]
            stateCopy.messages.push(newMessage)
            return stateCopy
            // return  {
            //     ...state,
            //     newMessageText: '',
            //     messages: [...state.messages, {id: 6, message: body}]
            // }
        }
        case UPDATE_NEW_MESSAGE: {
            stateCopy = {...state}
            stateCopy.newMessageText = action.messageText
            return stateCopy

      }
        default: {
            return state
        }
    }
}

export const addMessageActionCreator = () => {
    return {type: ADD_MESSAGE}
}

export const updateNewMessageActionCreator = (messageText) => {
    return {type: UPDATE_NEW_MESSAGE, messageText: messageText}
}
