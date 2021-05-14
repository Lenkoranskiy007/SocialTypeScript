import { Dispatch } from 'redux'
import { chatAPI } from '../Api/ChatApi'
import {ChatMessageType} from '../pages/chat/ChatPage'

let SET_CHAT_PAGE = 'SET_CHAT_PAGE'

const initialState = {
    messages: [] as ChatMessageType[]
}
type InitialStateType = typeof initialState

export const chatReducer = (state: InitialStateType = initialState, action: any):InitialStateType  => {
   switch(action.type) {
       case 'SET_CHAT_PAGE': 
           debugger
           return {
               ...state,
               messages: [...state.messages, ...action.payload.messages]

           }

       default: 
       return state
   }
}


const actions  = {
    messagesReceivedAC:  (messages: ChatMessageType[]) => ({
         type: 'SET_CHAT_PAGE' , payload: {messages}} as const ) 
}


let _newMessageHandler: ((messages: ChatMessageType[] ) => void) | null = null


const newMessageHandlerCreator = (dispatch: Dispatch) => {
   if (_newMessageHandler === null) {
       _newMessageHandler = (messages) => {
           dispatch(actions.messagesReceivedAC(messages))
       }
   }

   return _newMessageHandler
}


export const startMessagesListeningTC = () => async (dispatch: Dispatch) => {
    
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}


export const stopMessagesListeningTC = () => async (dispatch: Dispatch) => {
    chatAPI.unSubscribers(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
  }

  export const sendMessageTC = (message: string) => async (dispatch: Dispatch) => {
   
    chatAPI.sendMessage(message)
  }