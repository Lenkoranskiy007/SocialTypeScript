import React from 'react'
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return   <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to="/profile"> Profile</NavLink>
        </div>
        <div className={classes.item}>
           <NavLink to='/dialogs'>Messages</NavLink>
        </div>
        <div className={classes.item}>
           <NavLink to='/users'>Users</NavLink>
        </div>
        <div className={classes.item}>
            <a>News</a>
        </div>
        <div className={classes.item}>
            <a>Music</a>
        </div>
        <div className={classes.item}>
            <a>Settings</a>
        </div>

    </nav>
}