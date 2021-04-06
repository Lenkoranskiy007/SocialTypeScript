import React from 'react'
import classes from './Dialogs.module.css';
import {DialogItem} from "./DilalogItem/DialogItem";
import {Message} from "./Message/Message";
import {useFormik} from "formik";
import {Button, TextField} from "@material-ui/core";


export const Dialogs = (props) => {

    let messagesElement = props.dialogsPage.messages.map((messages) => {
        return <Message id={messages.id} message={messages.message}/>
    })
    let dialogsElement = props.dialogsPage.dialogs.map((dialogs) => {
        return <DialogItem id={dialogs.id} name={dialogs.name}/>
    })


    let addMessage = () => {
        props.onSendMessage()

    }

    let onChangeMessage = (e) => {
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

// const AddMessageForm = (props) => {
//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//             rememberMe: false,
//             newMessageBody: ''
//         },
//         validate: (values) => {
//             const errors = {};
//             if (!values.newMessageBody) {
//                 errors.newMessageBody = 'Required!';
//             } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.newMessageBody)) {
//                 errors.newMessageBody = '';
//             }
//             return errors;
//         },
//
//
//         onSubmit: values => {
//             // props.onSendMessage(values.newMessageBody);
//             alert(JSON.stringify(values))
//         },
//
//
//     })
//
//
//
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             {props.messagesElement}
//             <TextField onChange={formik.handleChange}  name='newMessageBody'  />
//             <Button  type={'submit'} variant={'contained'} color={'secondary'} >Send Message</Button>
//             {formik.errors.newMessageBody ? <div style={{color: "blue"}}>{formik.errors.newMessageBody}</div>: null }
//         </form>
//     )
// }
