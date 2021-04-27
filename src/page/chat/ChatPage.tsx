import React from 'react'

const ChatPage = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat = () => {
    return (<div>
        <Messages/>
        <AddMessageForm/>
    </div>
 )
}


 const Messages = () => {
    
    const messages = [1,2,3,4]
    
    return (<div style={{height: '400px', overflowY: 'auto'}}>
     {messages.map((m: any, index: number ) => <Message key={index}/>)}
    {messages.map((m: any, index: number ) => <Message key={index}/>)}
    </div>

    )}



const Message = () => {
   const message = {
       url: 'http://via.placeholder.com/30',
       author: 'Farid',
       text: 'Hello friend'
   }
   
   return <div>
    <img src={message.url}/> <b>{message.author}</b>
    <br/>
    {message.text}
    <hr/>
    </div>
}




const AddMessageForm = () => {
    return (<div>
       <div><textarea ></textarea></div> 
        <div><button>Send</button></div>
    </div>

    )}


















export default ChatPage