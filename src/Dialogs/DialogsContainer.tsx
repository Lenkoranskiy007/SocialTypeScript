import React from 'react'
import {addMessageActionCreator, updateNewMessageActionCreator} from "../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAutthRedirect";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../redux/redux-store";


export default compose<React.ComponentType>(
    withAuthRedirect
)(Dialogs)

