import React, {ChangeEvent} from 'react'
import {Post} from "./Post/Post";
import {ProfilePageInitialStateType,
} from "../../redux/profile-reducer";



type MyPostsType  = {
    addPost: () => void
    profilePage: ProfilePageInitialStateType
    updateNewPostText: (text: string) => void

}


export const MyPosts = React.memo((props: MyPostsType) => {


    let addPost = () => {
        props.addPost()
    }


    let postsElements = props.profilePage.posts.map((post) => {
        return <Post id={post.id} message={post.message} likesCount={post.likesCount}/>
    })

    let onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }

    return <div>
            <div>My posts</div>
            <textarea value={props.profilePage.newPostText} onChange={onChangePost}  ></textarea>
            <button onClick={addPost}>Add post</button>
          
            {postsElements}
        </div>

})
