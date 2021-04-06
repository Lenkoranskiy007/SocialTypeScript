import React from 'react'
import {Profile} from "./Profile";
import {
    getProfileTC,
    getStatusTC,
    savePhotoTC, saveProfileTC,
    setUserProfileActionCreator,
    updateStatusTC
} from "../redux/profile-reducer";
import * as axios from "axios";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";
import {withAuthRedirect} from "../hoc/withAutthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {


    refreshProfile() {
        let userId = this.props.match.params.userId

        if(!userId) {
            userId = 2
        }
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
        //     this.props.setUserProfileActionCreator(response.data)
        // })
        this.props.getProfileTC(userId)
        this.props.getStatusTC(userId)
    }


    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {

        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatusTC={this.props.updateStatusTC}
                isOwner={!this.props.match.params.userId}
                savePhotoTC={this.props.savePhotoTC}
                saveProfileTC={this.props.saveProfileTC}
            />
        )

    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, {savePhotoTC, getProfileTC, getStatusTC, updateStatusTC, saveProfileTC}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)