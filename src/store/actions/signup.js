import * as actionTypes from './actionTypes';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupSuccess = (token, hashedKey) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        hashedKey: hashedKey
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}

export const signup = (name, password, entityType, seed) => {
    return {
        type: actionTypes.SIGNUP_USER,
        name,
        password,
        entityType,
        seed
    }
}
