
import * as actionTypes from './actionTypes';

export const createCredentialSuccess = (id, data) => {
    return {
        type: actionTypes.CREATE_CREDENTIAL_SUCCESS,
        orderId: id,
        orderData: data
    }

}
export const createCredentialFail = (error) => {
    return {
        type: actionTypes.CREATE_CREDENTIAL_FAIL,
        error: error
    }
}

export const createCredentialStart = () => {
    return {
        type: actionTypes.CREATE_CREDENTIAL_START
    }
}

export const createCredential = (name) => {
    return {
        type: actionTypes.CREATE_CREDENTIAL,
        name
    }
}


export const fetchCredentialsSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_CREDENTIALS_SUCCESS,
        orders: orders
    }

}
export const fetchCredentialsFail = (error) => {
    return {
        type: actionTypes.FETCH_CREDENTIALS_FAIL,
        error: error
    }
}

export const fetchCredentialsStart = () => {
    return {
        type: actionTypes.FETCH_CREDENTIALS_START
    }
}

export const fetchCredentials = (token, hashedKey) => {
    return {
        type: actionTypes.FETCH_CREDENTIALS,
        token,
        hashedKey
    }
}
