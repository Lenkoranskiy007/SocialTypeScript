import React from 'react'
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer, profileReducers} from "./profile-reducer";


export let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Farid'},
                {id: 2, name: 'Sudjaat'},
                {id: 3, name: 'Rufat'},
                {id: 4, name: 'Adam'},
                {id: 5, name: 'Tamerlam'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How do you do?'},
                {id: 3, message: "It's my first project men!"}
            ],
            newMessageText: 'Hi bro'
        },
        profilePage: {
            posts: [
                {id: 1, message: 'How are you', likesCount: '15'},
                {id: 2, message: "It's my first project men", likesCount: '20'}
            ],
            newPostText: 'Just do it'
        }
    },
    getState() {
        return this._state
    },

    subscriber(observer) {
        this._callSubscriber = observer
    },
    _callSubscriber() {
        console.log('state rendered')
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }

}
