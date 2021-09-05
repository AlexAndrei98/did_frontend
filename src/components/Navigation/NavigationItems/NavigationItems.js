import React from "react";
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Welcome</NavigationItem>
        {props.isAuthenticated &&
        <NavigationItem link='/documents'>Documents</NavigationItem>
        }
        {props.isAuthenticated &&
        <NavigationItem link='/identities'>Identitites</NavigationItem>
        }
        {props.isAuthenticated ?
            <NavigationItem link='/logout'>Logout</NavigationItem>
            :
            <NavigationItem link='/auth'>Authenticate</NavigationItem>
        }
        {!props.isAuthenticated &&
            <NavigationItem link='/signup'>Signup</NavigationItem>
        }
    </ul>
)

export default navigationItems;