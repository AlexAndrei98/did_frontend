import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBurgerBuilder, watchOrder, watchSignup, watchDocuments,watchDids, watchWelcome} from "./store/sagas/index";

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth';
import signupReducer from './store/reducers/signup';
import documentsReducer from './store/reducers/documents';
import linkedDidsReducer from './store/reducers/identities';
import welcomeReducer from './store/reducers/welcome';


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
    signup: signupReducer,
    documents: documentsReducer,
    dids : linkedDidsReducer,
    welcome: welcomeReducer

});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
// sagaMiddleware.run(watchBurgerBuilder);
// sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchSignup);
sagaMiddleware.run(watchDocuments);
sagaMiddleware.run(watchDids);
sagaMiddleware.run(watchWelcome);




ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
