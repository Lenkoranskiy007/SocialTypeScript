import React, {useState} from 'react'
import classes from "./Users.module.css";
import usersPhoto from "../photo/108180118-user-vector-icon-isolated-on-transparent-background-user-logo-concept.jpg";
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../Api/Api";
import {UsersType} from "../types/types";
import {UsersSearchForm} from './UsersSearchForm'
import { FilterType } from '../redux/users-reducer';


type UsersPropsType = {
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType ) => void
    totalCount: number
    currentPage: number
    users: Array<UsersType>
    followTC: any
    unfollowTC: any
    followingInProgress:  Array<number>
    toggleIsFollowingProgress: any
}


 const Users = (props:UsersPropsType, portionSize = 5) => {

    let pagesCount = Math.ceil( props.totalCount / 300)

    let pages = []
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    


    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        <div className={classes.paginator} >
            {
                     pages.map(p => {
                        // @ts-ignore
                         return  <span  className={props.currentPage === p && classes.selectedPage}
                                       onClick={() => { props.onPageChanged(p)}}

                        >{p}</span>
                    })}


            {

                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img  src={u.photos.small != null ? u.photos.small : usersPhoto}  className={classes.userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollowTC(u.id)
                                }}
                                > Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.followTC(u.id)
                                }}> Follow</button>
                            }

                    </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                        <span>

                    </span>
                    </span>


                    </div>

                )
            }
        </div>
        </div>
    )

}


// @ts-ignore
export default Users