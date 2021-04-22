import React, {useEffect, useState} from 'react'
import classes from "./Users.module.css";
import usersPhoto from "../photo/108180118-user-vector-icon-isolated-on-transparent-background-user-logo-concept.jpg";
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../Api/Api";
import {UsersType} from "../types/types";
import {UsersSearchForm} from './UsersSearchForm'
import { FilterType , getUsersTC,followTC, unfollowTC, toggleIsFetchingAC, setUsersAC, setTotalCountAC} from '../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { stat } from 'node:fs';
import { AppStateType } from '../redux/redux-store';
import {getTotalCount, getPageSize, getCurrentPage, getFollowingInProgress, getUsersFilter }from "../redux/users-selector";




 const Users: React.FC = (props, portionSize = 5) => {
 
    useEffect(() => {
    dispatch(getUsersTC(currentPage, pageSize, filter))
        // dispatch(toggleIsFetchingAC(true))
        // usersAPI.getUsers(currentPage, pageSize ).then(data => {
        //         toggleIsFetchingAC(false)
        //         //@ts-ignore
        //         setUsersAC(data.items)
        //         setTotalCountAC(data.totalCount)
        //     })
   }, [])

    const dispatch = useDispatch()
   
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const filter = useSelector(getUsersFilter)





    let pagesCount = Math.ceil( totalCount / 300)

    let pages = []
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    
    const  onPageChanged =  (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))

    }


    const onFilterChanged = (filter: FilterType) => {
       dispatch(getUsersTC(1, pageSize, filter))
   }

   const follow = (userId: number) => {
       dispatch(followTC(userId))
   }
    
   const unfollow = (userId: number) => {
    dispatch( unfollowTC(userId))
}
 

    


    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <div className={classes.paginator} >
            {
                     pages.map(p => {
                        // @ts-ignore
                         return  <span  className={currentPage === p && classes.selectedPage}
                                       onClick={() => { onPageChanged(p)}}

                        >{p}</span>
                    })}


            {

                users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img  src={u.photos.small != null ? u.photos.small : usersPhoto}  className={classes.userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    unfollow(u.id)
                                }}
                                > Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    follow(u.id)
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