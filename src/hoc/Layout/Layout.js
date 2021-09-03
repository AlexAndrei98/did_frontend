import React, {useState} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from './../../components/Footer/Footer';
import {connect} from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar
                name={props.name}
                isAuth={props.isAuthenticated}
                clicked={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
            <Footer/>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.name != null,
        name: state.auth.name
    }
}

export default connect(mapStateToProps)(Layout);