import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    credentials: null,
    fetching: false,
    error: false,
    creating: false,
    newCredential: {
        issued_to_name: null,
        signed: false,
        issuer_to_hashed_key : null,
        issuer_to_public_key : null,
        issuer_to_type: null,
        issued_to_hashed_key : null,
        issued_to_public_key : null,
        issued_to_type : null,
        issued_date : Date(),
        values_count : 1,
        keys : ["keey"],
        values: ["val"]
        

    }
}
const createCredentialStart = ( state, action ) => {
    return updateObject( state, { creating: true } );
};

const createCredentialSuccess = ( state, action ) => {
    return updateObject( state, { creating: false } );
};


const addDataPoint = ( state, action ) => {
    const newKeys = { keys : state.newCredential.keys.push("")}
    const updatedKeys = updateObject( state.newCredential, newKeys );

    const newValues = { values : state.newCredential.keys.push("")}
    const updatedValues = updateObject( state.newCredential, newValues );

    const newCreds = updateObject( state.newCredential, {values_count: state.newCredential.values_count + 1} );

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

        default: return state;
    }
};

export default reducer;

