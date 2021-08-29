import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    identities: [],
    error: false,
    loading: false
}
const createIdentitiesStart = ( state, action ) => {
    return updateObject( state, { loading: !state.loading } );
};

const createIdentitiesSuccess = ( state, action ) => {
    const dids = state.identities
    console.log('dids',dids)
    dids.push(action.orderData)
    console.log('new dids',dids)

    return updateObject( state, { loading: false ,
        identities: dids} );
};

const createIdentitiesError = ( state, action ) => {
    return updateObject( state, { loading: action.error } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_LINKED_DIDS_START: return createIdentitiesStart( state, action );
        case actionTypes.FETCH_LINKED_DIDS_SUCCESS: return createIdentitiesSuccess( state, action );
        case actionTypes.FETCH_LINKED_DIDS_FAIL: return createIdentitiesError( state, action );

        default: return state;
    }
};

export default reducer;

