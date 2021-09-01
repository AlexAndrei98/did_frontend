
import * as actionTypes from './actionTypes';


export const initDidsClean = () => {
    return {
        type: actionTypes.INIT_DIDS
    }

}

export const fetchLinkedDidsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_LINKED_DIDS_SUCCESS,
        orderData: data
    }

}
export const fetchLinkedDidsFail = (error) => {
    return {
        type: actionTypes.FETCH_LINKED_DIDS_FAIL,
        error: error
    }
}

export const fetchLinkedDidsStart = (hashedKey) => {
    return {
        type: actionTypes.FETCH_LINKED_DIDS_START,
        hashedKey: hashedKey
    }
}

export const fetchIdentities = (name) => {
    return {
        type: actionTypes.FETCH_LINKED_DIDS,
        name: name
    }
}


export const linkDidSuccess = (data) => {
    return {
        type: actionTypes.LINK_DID_SUCCESS,
        orderData: data
    }

}
export const linkDidFail = (error) => {
    return {
        type: actionTypes.LINK_DID_FAIL,
        error: error
    }
}

export const linkDid = (hashedKey, requesterHash, status) => {
    return {
        type: actionTypes.LINK_DID,
        hashedKey: hashedKey,
        requesterHash: requesterHash,
        status:status
    }
}