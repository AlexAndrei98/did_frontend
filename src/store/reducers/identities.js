import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    identities: [],
    error: false,
    loading: false
}
const fetchLinkedDidsStart = ( state, action ) => {
    return updateObject( state, { loading: !state.loading } );
};
const initDids = ( state, action ) => {
    console.log('cleann dids')
    return updateObject( state, { identities: [] } );
};
const fetchLinkedDidsSuccess = ( state, action ) => {
    const dids = state.identities
    console.log('dids',dids)
    dids.push(action.orderData)
    console.log('new dids',dids)

    return updateObject( state, {
        identities: dids} );
};

const createIdentitySuccess = ( state, action ) => {
    const dids = state.identities
    console.log('current',dids)
    let data = action.orderData
    dids.push(data)
    // console.log(data)
    // for (let key in data){
    //     dids.push(key.name)
    // }
    
    console.log('new dids',dids)

    return updateObject( state, { loading: false ,
        identities: dids} );
};

const createIdentitiesError = ( state, action ) => {
    
    return updateObject( state, { loading: action.error } );
};




const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_LINKED_DIDS_START: return fetchLinkedDidsStart( state, action );
        case actionTypes.FETCH_LINKED_DIDS_SUCCESS: return fetchLinkedDidsSuccess( state, action );
        case actionTypes.FETCH_LINKED_DIDS_FAIL: return createIdentitiesError( state, action );
        case actionTypes.LINK_DID_SUCCESS: return createIdentitySuccess( state, action );
        case actionTypes.INIT_DIDS: return initDids( state, action );

        default: return state;
    }
};

export default reducer;

