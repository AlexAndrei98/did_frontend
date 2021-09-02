import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    credentials: [],
    fetching: false,
    error: false,
    creating: false
}
const createCredentialStart = ( state, action ) => {
    return updateObject( state, { creating: true } );
};

const createCredentialSuccess = ( state, action ) => {

    return updateObject( state, { creating: false } );
};

const initCredentials = ( state, action ) => {

    return updateObject( state, { credentials: [] } );
};

const fetchCredentialsDone = ( state, action ) => {

    return updateObject( state, { fetching: true } );
};

const fetchCredentialsSuccess = ( state, action ) => {
    const dids = state.credentials
    console.log('fetch credentials success old',dids)
    dids.push(action.orderData)
    console.log('new credentials',dids)

    return updateObject( state, { 
        credentials: dids} );
};

const addDataPoint = ( state, action ) => {
    const newKeys = { keys : state.newCredential.keys.push("")}
    const updatedKeys = updateObject( state.newCredential, newKeys );

    const newValues = { values : state.newCredential.values.push("")}
    const updatedValues = updateObject( state.newCredential, newValues );

    const newCreds = updateObject( state.newCredential, {values_count: state.newCredential.values_count + 1} );

    const updatedState = {
        newCredential: newCreds
    }
    return updateObject( state, updatedState );
};

const setDataPoint = ( state, action , value ) => {
    const newData = state.newCredential.keys[action.index] = value
    const newKeys = { keys : newData}
    const updatedKeys = updateObject( state.newCredential, newKeys );

    const newValues = { values : state.newCredential.values.push("")}
    const updatedValues = updateObject( state.newCredential, newValues );

    const newCreds = updateObject( state.newCredential, {values_count: state.newCredential.values_count + 1} );

    const updatedState = {
        newCredential: newCreds
    }
    return updateObject( state, updatedState );
};


const deleteDataPoint = ( state, action ) => {
    
    const newKeys = { keys : state.newCredential.keys.splice(action.index)}
    const updatedKeys = updateObject( state.newCredential, newKeys );

    const newValues = { values : state.newCredential.values.splice(action.index)}
    const updatedValues = updateObject( state.newCredential, newValues );

    const newCreds = updateObject( state.newCredential, {values_count: state.newCredential.values_count - 1} );

    const updatedState = {
        newCredential: newCreds
    }
    return updateObject( state, updatedState );
};
    // body = {
    // 'issued_to_name': 'Alex Andrei'
    // 'issuer_to_hashed_key': 'afjk312kj4jkkj',
    // 'issuer_to_public_key' : '---public key issuer---- ',
    // 'issuer_to_type': 'TITLE_ORG',
    // 'issued_to_hashed_key': 'vfeajv12yg32kvvgha', 
    // 'issued_to_public_key' : '---public key issued---- ',
    // 'issued_to_type': 'PERSON',
    // 'signed' : 'False',
    // 'issued_date':'2021-10-02:11.22.5323'
    // 'more_data':{'Property Type':'Commercial','Address':'123 4th Ave, San Francisco, CA ','Description':'Lot in between 3rd and 5th Ave','Liens':'HOA Fee',}
    //     }


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_CREDENTIAL_START: return createCredentialStart( state, action );
        case actionTypes.CREATE_CREDENTIAL_SUCCESS: return createCredentialSuccess( state, action );
        case actionTypes.FETCH_CREDENTIALS_SUCCESS: return fetchCredentialsSuccess( state, action );
        case actionTypes.FETCH_CREDENTIALS_DONE: return fetchCredentialsDone( state, action );
        case actionTypes.INIT_CREDENTIALS: return initCredentials( state, action );

        
        default: return state;
    }
};

export default reducer;

