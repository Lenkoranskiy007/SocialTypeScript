import React from 'react'
import {Redirect} from "react-router";
import {connect} from "react-redux";
import { AppStateType } from '../redux/redux-store';


const mapStateToPropsForRedirect  = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    } as WithAuthRedirectType
}

type WithAuthRedirectType = {
   isAuth: boolean | null 
}
type DispatchPropsType = {}


export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>)  {
    const RedirectComponent: React.FC<WithAuthRedirectType & DispatchPropsType> = (props) => {
              
       let {isAuth, ...restProps} = props

            if(!isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component {...restProps as WCP}/>
        
    }
    let ConnectedAuthRedirectComponent = connect<WithAuthRedirectType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
    return ConnectedAuthRedirectComponent
}




