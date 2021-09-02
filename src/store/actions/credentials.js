
import * as actionTypes from './actionTypes';

export const signCredentialSuccess = () => {
    return {
        type: actionTypes.SIGN_CREDENTIAL_SUCCESS
    }

}

export const signCredential = (issuer_to_hashed_key , issued_to_hashed_key,issued_date) => {
    return {
        type: actionTypes.SIGN_CREDENTIAL,
        issuer_to_hashed_key:issuer_to_hashed_key,
        issued_to_hashed_key:issued_to_hashed_key,
        issued_date:issued_date

    }

}

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

export const initCredentialsClean = () => {
    return {
        type: actionTypes.INIT_CREDENTIALS

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
