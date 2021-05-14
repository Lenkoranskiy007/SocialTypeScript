import {ChatMessageType} from '../pages/chat/ChatPage'

type SubscribeType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscribeType[]

let ws: WebSocket | null = null

console.log(ws)

const closeHandler = () => {
    console.log('WS CLOSE')
    setTimeout(createChannel, 3000)
}

let messagesHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data) 
    subscribers.forEach(e => e(newMessage))
    
}

function createChannel() {

  ws?.removeEventListener('close', closeHandler)
   ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messagesHandler)
}



export const chatAPI = {
    start () {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messagesHandler)
        ws?.close()
    },


    subscribe (callback: SubscribeType ) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(sub  => sub !== callback)
        }
    },

    unSubscribers(callback: SubscribeType) {
        subscribers = subscribers.filter(sub  => sub !== callback)
    },
    
    sendMessage (message: string) {
        ws?.send(message)
    }
}