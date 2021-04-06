import React, {useEffect, useState} from 'react'

const  ProfileHookStatus = (props) => {

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

    const onStatusChange = (e) => {
        let text = e.currentTarget.value
        setStatus(text)
    }

        return editMode
            ? <div>  <input autoFocus onChange={onStatusChange} onBlur={ deactivateEditMode} value={status} /></div>
            : <div> <b>Status: </b> <span onDoubleClick={ activateEditMode}>{props.status}</span></div>

}




export default ProfileHookStatus