import classes from "../Dialogs.module.css";
import React from "react";


type MessageType = {
    id: number
    message: string
}

// @ts-ignore
export const Message = (props: MessageType) => {
    return <div className={classes.dialog}>{props.message}</div>
}