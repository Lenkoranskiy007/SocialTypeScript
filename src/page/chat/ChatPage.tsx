import React, { useEffect, useState, ChangeEvent } from 'react'
 
// const wsChannel  = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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


    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
 
        let ws: WebSocket;

        const closeHandler = () => {
            console.log('WS CLOSE')
            setTimeout(createChannel, 3000)
        }

      function createChannel() {
      
          ws?.removeEventListener('close', closeHandler)
         ws?.close()
          ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
          ws?.addEventListener('close', closeHandler)
          setWsChannel(ws)
      }

      createChannel();


      return () => {
          ws.removeEventListener('close', closeHandler)
          ws.close()
      }
    }, [])

    useEffect(() => {
        wsChannel?.addEventListener('close', () => {
            console.log('WS')
        })
    }, [wsChannel])

   

    return (<div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm   wsChannel={wsChannel}/>
    </div>
 )
}




type MessagesType = {
    wsChannel: WebSocket | null
}

 const Messages = (props: MessagesType) => {
    
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    
    
    
    useEffect( () => {
        let messagesHandler = (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data) 
            setMessages( (prevState) => [...prevState, ...newMessage,])
        }
        props.wsChannel?.addEventListener('message',messagesHandler)
 
     return () => {
         props.wsChannel?.removeEventListener('message', messagesHandler)
     }
    
    
    } ,

    
    [props.wsChannel])
 
    
    
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


type AddMessageFormType = {
    wsChannel: WebSocket | null
}

const AddMessageForm = (props: AddMessageFormType) => {

    const [message, setMessage] = useState('')

    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
   
   
    useEffect(() => {   
        let openHandler = () => {
            setReadyStatus('ready')
        }
        props.wsChannel?.addEventListener('open',openHandler)
      
    
    }, [props.wsChannel])
    

    const sendMessage = () => {
        if(!message) {
            return
        }
        props.wsChannel?.send(message)
        setMessage('')
        
    }

    const onSetMessage = (e:  ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
        
    }

    
    return (<div>
       <div><textarea onChange={onSetMessage}  value={message}></textarea></div> 
        <div><button disabled={ props.wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button></div>
    </div>

    )}


















export default ChatPage