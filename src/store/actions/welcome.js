
import * as actionTypes from './actionTypes';


export const fetchPublicData = () => {
    return {
        type: actionTypes.FETCH_WELCOME_DATA
    }
}
export const cleanWelcomeData = () => {
    return {
        type: actionTypes.FETCH_WELCOME_DATA_START
    }
}

export const setWelcomeData = (data) => {
    return {
        type: actionTypes.FETCH_WELCOME_DATA_SUCCESS,
        data:data
    }
}

export const setWelcomeError = (error) => {
    return {
        type: actionTypes.FETCH_WELCOME_DATA_FAIL,
        error: error
    }
}
