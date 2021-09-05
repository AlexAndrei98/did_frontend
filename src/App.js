import React, {useEffect, Suspense} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
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


const Identities = React.lazy( () => {
    return import('./containers/Identities/Identities');
});

const Welcome = React.lazy( () => {
    return import('./containers/Welcome/Welcome');
});



const App = (props) => {
    // DISABLE FOR ONT CACHING
    // const { onTryAutoSignup } = props;

    // useEffect( () => {
    //     onTryAutoSignup();
    // }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route path={'/auth'} render={ (props) => <Auth {...props}/>}/>
            <Route path={'/signup'} render={ (props) => <Signup {...props}/>}/>
            <Route exact path={'/'} component={Welcome}/>
            <Redirect to='/signup'/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                {/* <Route path={'/orders'} render={ (props) => <Orders {...props}/>}/> */}
                <Route path={'/credentials'} render={ (props) => <Credentials {...props}/>}/>
                <Route path={'/identities'} render={ (props) => <Identities {...props}/>}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path='/' component={Welcome}/>
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
        isAuthenticated: state.auth.name !== null,
        name:state.auth.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(action.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
