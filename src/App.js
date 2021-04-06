import './App.css';
import {Navbar} from "./Navbar/Navbar";
import {Route} from "react-router-dom";
// import DialogsContainer from "./Dialogs/DialogsContainer";
import UsersContainer from "./USers/UsersContainer";
// import ProfilesContainer from "./Profile/ProfilesContainer";
import HeadersContainer from "./Header/HeaderContainer";
import LoginContainer, {Login, MyForm} from "./Login/Login";
import React from 'react'
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {Preloader} from "./logo/Preloader";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const ProfilesContainer = React.lazy(() => import('./Profile/ProfilesContainer'));



class  App extends React.Component {

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
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?'
                           render={ withSuspense(ProfilesContainer)}/>

                    <Route path='/users' render={() => <UsersContainer
                    />}/>

                    <Route path='/login' render={() => <LoginContainer
                    />}/>

                </div>
            </div>

        );
    }


}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }

}


export default  compose(withRouter, connect(mapStateToProps, {initializeAppTC}))(App)

