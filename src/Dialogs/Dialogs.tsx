import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css';
import {DialogItem} from "./DilalogItem/DialogItem";
import {Message} from "./Message/Message";
import {useFormik} from "formik";
import {Button, TextField} from "@material-ui/core";
import { DialogsReducerInitialType } from '../redux/dialogs-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import {addMessageActionCreator, updateNewMessageActionCreator} from "../redux/dialogs-reducer";






export const Dialogs: React.FC = (props) => {

    const dispatch = useDispatch()
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)


    const addMessage = () => {
        let action = addMessageActionCreator()
         dispatch(action)
    }


    let messagesElement = dialogsPage.messages.map((messages) => {
        return <Message id={messages.id} message={messages.message}/>
    })
    let dialogsElement = dialogsPage.dialogs.map((dialogs) => {
        return <DialogItem id={dialogs.id} name={dialogs.name}/>
    })


   

    let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let messageText = e.target.value
        dispatch(updateNewMessageActionCreator(messageText))

    }



    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
                <TextField onChange={onChangeMessage} value={dialogsPage.newMessageText}></TextField>
                <button onClick={addMessage}>send</button>
            </div>
        </div>)
}
