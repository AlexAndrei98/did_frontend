import * as actionTypes from './../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    name: null,
    password: null,
    entityType: null,
    seed: null,
    hashedKey: null,
    privateKey: null,
    error: null,
    loading: false
}

const signupStart = (state, action) => {
    return updateObject(state, {error: null, loading: true})
}

const signupSuccess = (state, action) => {
    return updateObject( state, {
        name: action.name,
        password: action.password,
        entityType: action.entityType,
        seed: action.seed,
        hashedKey: action.hashedKey,
        privateKey: action.privateKey,
        error: null,
        loading: false
    } );
}

const signupFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default: return state;
    }
}

export default reducer;