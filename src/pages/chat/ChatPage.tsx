import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListeningTC, stopMessagesListeningTC,sendMessageTC } from '../../redux/chatPage-reducer'
import { AppStateType } from '../../redux/redux-store'
import { withRouter} from "react-router";
import {compose} from "redux";


 
// const wsChannel  = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {
    return <div>
        <Chat/>
    </div>
}


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}



const Chat = () => {


    const dispatch = useDispatch()


    useEffect(() => {
         dispatch(startMessagesListeningTC())
       return () => {
           
           dispatch(stopMessagesListeningTC)
       }
    }, [])



    return (<div>
        <Messages />
        <AddMessageForm/>
    </div>
 )
}





 const Messages = (props: any) => {
    
  const messages = useSelector((state: AppStateType) => state.chat.messages) 
   
    
    return (<div style={{height: '400px', overflowY: 'auto'}}>
     {messages.map((message: ChatMessageType, index: number ) => <Message message={message} key={index}/>)}
    </div>

    )}


type MessageType = {
    message: ChatMessageType
}

const Message = (props: MessageType) => {

   
   return <div>
    <img style={{height:'50px'}} src={props.message.photo}/> <b>{props.message.userName}</b>
    <br/>
    {props.message.message}
    <hr/>
    </div>
}




const AddMessageForm = () => {

    const [message, setMessage] = useState('')

    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
   
    const dispatch = useDispatch()   


    const sendMessage = () => {
       
        if(!message) {
            return
        }
        dispatch(sendMessageTC(message))
        setMessage('')
        
    }

    const onSetMessage = (e:  ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
        
    }

    
    return (<div>
       <div><textarea onChange={onSetMessage}  value={message}></textarea></div> 
        <div><button onClick={sendMessage}>Send</button></div>
    </div>

    )}


    export default compose<React.ComponentType>(
        withRouter,
        //withAuthRedirect
    )(ChatPage)