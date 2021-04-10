import React, {ChangeEvent, ChangeEventHandler, useState} from 'react'
import classes from "../Profile.module.css";
import preloader from '../../photo/preloader.gif'
import ProfileHookStatus from "./ProfileStatusHook";
import userPhoto from '../../photo/108180118-user-vector-icon-isolated-on-transparent-background-user-logo-concept.jpg'
import {ProfileDataForm} from "./ProfileDataForm";
import {Button, FormGroup} from "@material-ui/core";
import {ProfileType} from "../../types/types";


type ProfileInfoType = {
    saveProfileTC: (profile: ProfileType) => void
    savePhotoTC: (file: string) => void
    isOwner: boolean
    profile: any
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <img src={preloader}/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhotoTC(e.target.files[0])
        }
    }

    return (

        <div>
            {/*/*<img src="https://www.nultylighting.co.uk/wp-content/uploads/2012/10/retail-store-sport-red-light-tunnel-consultant-nulty-banner-1920x1080.jpg" alt=""/>*!/*/}
             <img src={props.profile.photos.large || userPhoto} alt=""/>
               {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            <div>
                {editMode
                    ? <ProfileDataForm profile={props.profile} saveProfileTC={props.saveProfileTC} setEditMode={setEditMode} />
                    : <ProfileData
                      goToEditMode={ () => {setEditMode(true)}}
                      profile={props.profile}
                      isOwner={props.isOwner}
                    />}
                <ProfileHookStatus status={props.status} updateStatusTC={props.updateStatusTC}/>
            </div>
        </div>


    )
}


type ProfileDataFormType = {
    goToEditMode: () => void
    profile: any
    isOwner: boolean

}

export const ProfileData = (props: ProfileDataFormType) => {
    return (
        <div>
            {props.isOwner &&  <Button onClick={props.goToEditMode} type={'submit'} variant={'contained'} color={'secondary'}>Edit</Button>}

        <div>
            <b>Full name</b>: {props.profile.fullName}
        </div>
        <div>
            <b>Looking For A Job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>My professional skills </b>: {props.profile.lookingForAJobDescription}
        </div>
            {console.log()}
        <div>
            <b>About me </b>: {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile[key]}/>
        })}
        </div>
    </div>)
}

type ContactPropsType = {
    contactTitle: string
    contactValue: number
}


export const Contact = (props:ContactPropsType ) => {
    return <div className={classes.contact}><b>{props.contactTitle}</b>: {props.contactValue}</div>
}
