import React from 'react'
import {connect} from "react-redux";
import { logoutTC, setUserDataActionCreator} from "../redux/auth-reducer";
import * as axios from "axios";
import {Header} from "./Header";

class HeaderContainer extends React.Component {



    render() {
    return <Header  {...this.props} login={this.props.login} isAuth={this.props.isAuth} logoutTC={this.props.logoutTC}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

let HeadersContainer = connect(mapStateToProps, {setUserDataActionCreator,  logoutTC})(HeaderContainer)
export default HeadersContainer
