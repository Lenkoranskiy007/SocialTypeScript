import React from 'react'
import classes from './Post.module.css'

export const Post = (props) => {
    return (
        <div>

          <div className={classes.post}>
              <img src="https://yt3.ggpht.com/a/AATXAJz-1PtE8lX9vkai1lGelSNLsGuCSXBKgctDkEKM=s900-c-k-c0xffffffff-no-rj-mo" alt=""/>
              {props.message}</div>
           <div className={classes.post}>{props.likesCount}</div>
        </div>
    )
}