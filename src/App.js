import React, {useEffect, Suspense} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from './components/UI/Spinner/Spinner';
import * as action from './store/actions/index';

const Orders = React.lazy( () => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy( () => {
    return import("./containers/Auth/Auth");
});

const Signup = React.lazy( () => {
    return import("./containers/Signup/Signup");
});

const Credentials = React.lazy( () => {
    return import('./containers/Credentials/Credentials');
});

const App = (props) => {

    let routes = (
        <Switch>
            <Route path={'/auth'} render={ (props) => <Auth {...props}/>}/>
            <Route path={'/signup'} render={ (props) => <Signup {...props}/>}/>
            <Route exact path={'/'} component={BurgerBuilder}/>
            <Redirect to='/signup'/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path={'/orders'} render={ (props) => <Orders {...props}/>}/>
                <Route path={'/credentials'} render={ (props) => <Credentials {...props}/>}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path='/' component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner/>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.name !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(action.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
