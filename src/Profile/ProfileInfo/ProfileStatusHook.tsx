import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react'

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}


const  ProfileHookStatus = (props: ProfileStatusType) => {

    const[editMode,setEditMode] = useState(false)
    const[status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

   const  activateEditMode =  () => {
        setEditMode(true)
    }

   const deactivateEditMode = () => {
        setEditMode(false)
       props.updateStatusTC(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
        setStatus(text)
    }

        return editMode
            ? <div>  <input autoFocus onChange={onStatusChange} onBlur={ deactivateEditMode} value={status} /></div>
            : <div> <b>Status: </b> <span onDoubleClick={ activateEditMode}>{props.status}</span></div>

}




// @ts-ignore
export default ProfileHookStatus