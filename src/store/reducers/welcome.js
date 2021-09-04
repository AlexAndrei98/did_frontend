import * as actionTypes from './../actions/actionTypes';

import { updateObject } from "../../shared/utility";

const initialState = {
    data: [],
    fetching: false,
    error: false
}

const fetchWelcomeDataStart = ( state, action ) => {
    return updateObject( state, { fetching: true } );
};

const welcomeDataSuccess = ( state, action ) => {
    return updateObject( state, { data: action.data, fetching: false} );
};

const fetchWelcomeDataFailure = ( state, action ) => {
    return updateObject( state, { error: action.error ,fetching: false} );
};


export const FETCH_WELCOME_DATA_START = 'FETCH_WELCOME_DATA_START'
export const FETCH_WELCOME_DATA_SUCCESS = 'FETCH_WELCOME_DATA_SUCCESS'
export const FETCH_WELCOME_DATA_FAIL = 'FETCH_WELCOME_DATA_FAIL'


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_WELCOME_DATA_START: return fetchWelcomeDataStart( state, action );
        case actionTypes.FETCH_WELCOME_DATA_SUCCESS: return welcomeDataSuccess( state, action );
        case actionTypes.FETCH_WELCOME_DATA_FAIL: return fetchWelcomeDataFailure( state, action );
        default: return state;
    }
};

export default reducer;

