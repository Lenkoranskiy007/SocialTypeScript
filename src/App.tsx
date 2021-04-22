import './App.css';
import {Navbar} from "./Navbar/Navbar";
import {Route} from "react-router-dom";
// import DialogsContainer from "./Dialogs/DialogsContainer";
import {UsersContainer} from "./USers/UsersContainer";
// import ProfilesContainer from "./Profile/ProfilesContainer";
import HeadersContainer from "./Header/HeaderContainer";
import  {Login} from "./Login/Login";
import React from 'react'
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {Preloader} from "./logo/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";


const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const ProfilesContainer = React.lazy(() => import('./Profile/ProfilesContainer'));


const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfilesContainer)




type AppPropsType = {
    initializeAppTC: () => void
    initialized: boolean
}


class  App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
        
    }
  
    render() {
     if(!this.props.initialized) {
      return  <Preloader/>
     }


      
        return (

            <div className="App-wrapper">
                <HeadersContainer/>
                <Navbar/>

                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <SuspendedProfile/>}/>

                    <Route path='/users' render={() => <UsersContainer
                    />}/>

                    <Route path='/login' render={() => <Login
                    />}/>

                </div>
            </div>

        );
    }


}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }

}


export default  compose(withRouter, connect(mapStateToProps, {initializeAppTC}))(App)

