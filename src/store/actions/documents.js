
import * as actionTypes from './actionTypes';




export const shareDocumentInit = () => {
    return {
        type: actionTypes.SHARE_DOCUMENT_INIT
    }
}

export const shareDocument = (data) => {
    return {
        type: actionTypes.SHARE_DOCUMENT,
        data: data
    }
}

export const shareDocumentSuccess = (data) => {
    return {
        type: actionTypes.SHARE_DOCUMENT,
        documentToShare: data
    }
}


export const signDocumentSuccess = () => {
    return {
        type: actionTypes.SIGN_DOCUMENT_SUCCESS
    }

}

export const signDocument = (issuer_to_hashed_key , issued_to_hashed_key,issued_date) => {
    return {
        type: actionTypes.SIGN_DOCUMENT,
        issuer_to_hashed_key:issuer_to_hashed_key,
        issued_to_hashed_key:issued_to_hashed_key,
        issued_date:issued_date

    }

}

export const createDocumentSuccess = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_SUCCESS
    }

}
export const createDocumentFail = (error) => {
    return {
        type: actionTypes.CREATE_DOCUMENT_FAIL,
        error: error
    }
}

export const createDocumentStart = () => {
    return {
        type: actionTypes.CREATE_DOCUMENT_START
    }
}

export const createDocument = (data) => {
    return {
        type: actionTypes.CREATE_DOCUMENT,
        body: data

    }
}

export const doneFetching = () => {
    return {
        type: actionTypes.FETCH_DOCUMENTS_DONE

    }
}

export const initDocumentsClean = () => {
    return {
        type: actionTypes.INIT_DOCUMENTS

    }
}

export const fetchDocumentsSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_DOCUMENTS_SUCCESS,
        orderData: orders
    }

}
export const fetchDocumentsFail = (error) => {
    return {
        type: actionTypes.FETCH_DOCUMENTS_FAIL,
        error: error
    }
}

export const fetchDocumentsStart = () => {
    return {
        type: actionTypes.FETCH_DOCUMENTS_START
    }
}

export const fetchDocuments = ( hashedKey) => {
    return {
        type: actionTypes.FETCH_DOCUMENTS,
        name: hashedKey
    }
}
