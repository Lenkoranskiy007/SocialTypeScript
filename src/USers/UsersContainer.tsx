import React from 'react'
import {connect} from "react-redux";
import {
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
    getUsers
} from "../redux/users-selector";
import {UsersType} from "../types/types";
import { AppStateType} from '../redux/redux-store';
import {compose} from "redux";




type MapDispatchToPropsType = {
    followingInProgress: Array<number>
    followTC: any
    unfollowTC: any
    toggleIsFollowingProgress: any
    getUsersTC: (currentPage: number, pageSize: number) => void

}

type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching:  boolean

}

type UsersContainerPropsType = MapDispatchToPropsType & MapStateToPropsType



class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {

        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetchingAC(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize ).then(data => {
        //         this.props.toggleIsFetchingAC(false)
        //         this.props.setUsersAC(data.items)
        //         this.props.setTotalCountAC(data.totalCount)
        //     })

    }

    onPageChanged =  (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize)

    }

    render() {

        let pagesCount = Math.ceil( this.props.totalCount / 400)
        let pages = []
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <>
            {this.props.isFetching? <Preloader/>: null}

         <Users
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            totalCount={this.props.totalCount}
            currentPage={this.props.currentPage}
            users={ this.props.users}
            followTC={this.props.followTC}
            unfollowTC={this.props.unfollowTC}
            followingInProgress={this.props.followingInProgress}
            toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
        />
        </>
    }
}





let mapStateToProps = (state: AppStateType) => {
    return {
        users:  state.usersPage.users,
        pageSize: getPageSize(state),
        totalCount:getTotalCount(state),
        currentPage:getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}





// @ts-ignore
export default compose(connect<MapDispatchToPropsType, MapStateToPropsType, AppStateType>(mapStateToProps, {followTC,unfollowTC,setUsersAC,
    setCurrentPageAC,setTotalCountAC,
    toggleIsFetchingAC, toggleIsFollowingProgress,
    getUsersTC
}))(UsersContainer)
