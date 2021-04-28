import React, { useEffect, useState } from 'react'

const wsChannel  = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {
    return <div>
        <Chat/>
    </div>
}


type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = () => {

   

    return (<div>
        <Messages/>
        <AddMessageForm/>
    </div>
 )
}


 const Messages = () => {
    
    const [messages, setMessages] = useState<ChatMessageType[]>([])
   
   
    
    useEffect( () => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {

        const newMessage = JSON.parse(e.data)

      setMessages( (prevState) => [...prevState, ...newMessage,])
     })
 
    } ,
    
    [])
 
    
    
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
    const sendMessage = () => {
        wsChannel.send(message)
    }

    
    return (<div>
       <div><textarea onChange={(e) => setMessage(e.currentTarget.value)}  value={message}></textarea></div> 
        <div><button onClick={sendMessage}>Send</button></div>
    </div>

    )}


















export default ChatPage