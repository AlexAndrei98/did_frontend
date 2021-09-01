import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (name, password, entityTypeUser , publicKey) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        name: name,
        password: password,
        entityTypeUser : entityTypeUser,
        publicKey :publicKey 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("expirationDate");
    // localStorage.removeItem("hashedKey");
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (name, password) => {
    return {
        type: actionTypes.AUTH_USER,
        name,
        password
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
};