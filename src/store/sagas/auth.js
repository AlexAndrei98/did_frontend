import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-auth";
import sha256 from "js-sha256"

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "name");
    yield call([localStorage, 'removeItem'], "password");
    yield call([localStorage, 'removeItem'], "hashedKey");
    yield put(actions.logoutSucceed())
}


export function* authUserSaga(action) {
    
    yield put(actions.authStart());
    const authData = {
        hashed_key: sha256(action.name),
        password: sha256(action.password)
    }
    let url= '/did_get'
    try {
        const response = yield axios.post(url, {"body":JSON.stringify(authData)})
        const data = JSON.parse(response.data.body)
        console.log('Successfully logged in', data)
        yield call([localStorage, 'setItem'], "name", data.name);
        yield call([localStorage, 'setItem'], "hashedKey", data.hashed_key);
        yield call([localStorage, 'setItem'], "password", data.password);
        yield call([localStorage, 'setItem'], "entityType", data.entityType);

        /*this lines set the  state.auth.name and state.auth.hashedKey*/ 
        yield put(actions.authSuccess(data.name, data.password, data.entityType))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const hashedKey = yield call([localStorage, 'getItem'], "hashedKey");
    console.log(hashedKey)
    if (!hashedKey) {
        yield put(actions.logout());
    } else {
        const name = yield call([localStorage, 'getItem'], "name");
        const password = yield call([localStorage, 'getItem'], "password");
        const entityType = yield call([localStorage, 'getItem'], "entityType");

        yield put(actions.authSuccess(name, password,entityType));
    }
}