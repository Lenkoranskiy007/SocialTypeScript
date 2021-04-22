import React from 'react'
import classes from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../redux/redux-store';
import { saveProfileTC, ProfileType, savePhotoTC, updateStatusTC } from '../redux/profile-reducer';

type ProfilePropsType = {
    // saveProfileTC: (profile: ProfileType) => void
    // savePhotoTC: (file: string) => void
    isOwner: boolean
    // profile: ProfileType
    // updateStatusTC: (status: string) => void
}


export const Profile = (props: any) => {
   const dispatch  = useDispatch()
   const status = useSelector((state: AppStateType) => state.profilePage.status)
   const profile = useSelector((state: AppStateType) => state.profilePage.profile)
   const saveProfile = (profile: ProfileType) => {
       dispatch(saveProfileTC(profile))
   }
   const  savePhoto =  (file: string) => {
       dispatch(savePhotoTC(file))
   }

   const updateStatus = (status: string) => {
       dispatch(updateStatusTC(status))
   }



    return <div className={classes.content}>
        <ProfileInfo saveProfileTC={saveProfile} savePhotoTC={savePhoto} isOwner={props.isOwner} profile={profile } status={status} updateStatusTC={updateStatus}/>
        <hr/>
        <MyPostsContainer />
        </div>

}

