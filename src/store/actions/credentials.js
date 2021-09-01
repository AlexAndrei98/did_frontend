
import * as actionTypes from './actionTypes';



export const createCredentialSuccess = () => {
    return {
        type: actionTypes.CREATE_CREDENTIAL_SUCCESS
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

export const createCredential = (data) => {
    return {
        type: actionTypes.CREATE_CREDENTIAL,
        body: data

    }
}

export const doneFetching = () => {
    return {
        type: actionTypes.FETCH_CREDENTIALS_DONE

    }
}




export const fetchCredentialsSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_CREDENTIALS_SUCCESS,
        orderData: orders
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

export const fetchCredentials = ( hashedKey) => {
    return {
        type: actionTypes.FETCH_CREDENTIALS,
        name: hashedKey
    }
}
