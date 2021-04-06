import React from 'react'
import {Post} from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../redux/profile-reducer";
import {useFormik} from "formik";
import {Button, TextField} from "@material-ui/core";





export const MyPosts = React.memo(props => {
    console.log('redndede')

    let newPostElement  = React.createRef()

    let addPost = () => {
        props.addPost()
    }

    let postsElements = props.profilePage.posts.map((post) => {
        return <Post id={post.id} message={post.message} likesCount={post.likesCount}/>
    })

    let onChangePost = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return <div>
            <div>My posts</div>
            <textarea value={props.profilePage.newPostText} onChange={onChangePost} ref={newPostElement} ></textarea>
            <button onClick={addPost}>Add post</button>
            {postsElements}
        </div>

})
