import React from 'react'
import classes from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfileType = {
    saveProfileTC: (profile: ProfileType) => void
    savePhotoTC: (file: string) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatusTC: (status: string) => void
}


export const Profile = (props: any) => {

    return <div className={classes.content}>
        <ProfileInfo saveProfileTC={props.saveProfileTC} savePhotoTC={props.savePhotoTC} isOwner={props.isOwner} profile={props.profile } status={props.status} updateStatusTC={props.updateStatusTC}/>
        <hr/>
        <MyPostsContainer />
        </div>

}

