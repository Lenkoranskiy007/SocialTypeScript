import React from 'react'
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";


export const Header = (props) => {
    return <header className={classes.header}>

                <img src="https://ak.picdn.net/shutterstock/videos/1020730591/thumb/7.jpg" alt=""/>
                <div className={classes.loginBlock} >
                    {props.isAuth? <div>{props.login} - <button onClick={props.logoutTC}>Log out</button></div>
                        :<NavLink to={'/login'} >Login</NavLink>
                    }
                </div>

    </header>


}