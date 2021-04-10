import React from 'react'
import {addMessageActionCreator, updateNewMessageActionCreator} from "../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAutthRedirect";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../redux/redux-store";

const mapStateToProps  = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSendMessage: () => {
            let action = addMessageActionCreator()
            dispatch(action)
        },
        onChangeMessage: (messageText: string) => {
            let action = updateNewMessageActionCreator(messageText)
            dispatch(action)
        }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

