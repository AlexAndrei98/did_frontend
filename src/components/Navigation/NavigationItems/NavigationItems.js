import React from "react";
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticated &&
        <NavigationItem link='/orders'>Orders</NavigationItem>
        }
        {props.isAuthenticated &&
        <NavigationItem link='/credentials'>Credentials</NavigationItem>
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