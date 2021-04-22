import React, { useEffect } from 'react'
import {Profile} from "./Profile";
import {
    getProfileTC,
    getStatusTC,
    savePhotoTC, saveProfileTC,
    updateStatusTC
} from "../redux/profile-reducer";
import {connect, useDispatch} from "react-redux";
import {Redirect, withRouter} from "react-router";
import {compose} from "redux";
import {ProfileType} from "../types/types";
import {AppStateType} from "../redux/redux-store";

type ProfilesContainerType = {
    match: any
}




const  ProfileContainer = React.memo((props:ProfilesContainerType) => {
    
    const dispatch = useDispatch()

    const getProfile  = (userId: number) => {
        dispatch(getProfileTC(userId))
    } 

    const getStatus = (userId: number) => {
        dispatch(getStatusTC(userId))
    }


     const  refreshProfile = () => {
        let userId = props.match.params.userId

        if (!userId) {
            userId = 2
        }
        
        getProfile(userId)
        getStatus(userId)
    }




    useEffect(() => {
        refreshProfile()
    }, [])
    // componentDidUpdate(prevProps:any, prevState: any) {

    //     if (this.props.match.params.userId != prevProps.match.params.userId) {
    //         this.refreshProfile()
    //     }

    // }

   

        return (
            <Profile
                // {...this.props}
                // profile={this.props.profile}
                // status={this.props.status}
                // updateStatusTC={this.props.updateStatusTC}
                isOwner={!props.match.params.userId}
                // savePhotoTC={this.props.savePhotoTC}
                // saveProfileTC={this.props.saveProfileTC}
            />
        )

    
})




export default compose<React.ComponentType>(
    withRouter,
    //withAuthRedirect
)(ProfileContainer)