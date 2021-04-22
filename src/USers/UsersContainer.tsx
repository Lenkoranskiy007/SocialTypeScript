import React from 'react'
import {connect, useSelector} from "react-redux";
import {
    FilterType,
 followTC, getUsersTC,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    toggleIsFetchingAC, toggleIsFollowingProgress,
 unfollowTC
} from "../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import preloader from '../photo/preloader.gif'
import { usersAPI} from "../Api/Api";
import {Preloader} from "../logo/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalCount,
    getUsersFilter,
    getUsers
} from "../redux/users-selector";
import {UsersType} from "../types/types";
import { AppStateType} from '../redux/redux-store';
import {compose} from "redux";


export const UsersContainer = () => {



    const totalCount = useSelector(getTotalCount)
    const isFetching = useSelector(getIsFetching)

    

        let pagesCount = Math.ceil( totalCount / 400)
        let pages = []
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <>
            {isFetching? <Preloader/>: null}
         <Users />
        </>
    
}









