import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css';
import {DialogItem} from "./DilalogItem/DialogItem";
import {Message} from "./Message/Message";
import {useFormik} from "formik";
import {Button, TextField} from "@material-ui/core";
import { DialogsReducerInitialType } from '../redux/dialogs-reducer';




type DialogsType = {
    dialogsPage: DialogsReducerInitialType
    onSendMessage: () => void
    onChangeMessage: (messageText: string) => void
}

export const Dialogs = (props: DialogsType) => {

    let messagesElement = props.dialogsPage.messages.map((messages) => {
        return <Message id={messages.id} message={messages.message}/>
    })
    let dialogsElement = props.dialogsPage.dialogs.map((dialogs) => {
        return <DialogItem id={dialogs.id} name={dialogs.name}/>
    })


    let addMessage = () => {
        props.onSendMessage()

    }

    let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let messageText = e.target.value
        props.onChangeMessage(messageText)

    }



    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
                <TextField onChange={onChangeMessage} value={props.dialogsPage.newMessageText}></TextField>
                <button onClick={addMessage}>send</button>
            </div>
        </div>)
}
