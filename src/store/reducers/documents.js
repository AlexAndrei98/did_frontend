import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    documents: [],
    fetching: false,
    error: false,
    creating: false
}
const createDocumentStart = ( state, action ) => {
    return updateObject( state, { creating: true } );
};

const createDocumentSuccess = ( state, action ) => {

    return updateObject( state, { creating: false } );
};

const initDocuments = ( state, action ) => {

    return updateObject( state, { documents: [] } );
};

const fetchDocumentsDone = ( state, action ) => {

    return updateObject( state, { fetching: true } );
};

const fetchDocumentsSuccess = ( state, action ) => {
    const dids = state.documents
    console.log('fetch documents success old',dids)
    dids.push(action.orderData)
    console.log('new documents',dids)

    return updateObject( state, { 
        documents: dids} );
};

const signDocumentDone = ( state, action ) => {

    return updateObject( state, { fetching: true } );
};

const addDataPoint = ( state, action ) => {
    const newKeys = { keys : state.newDocument.keys.push("")}
    const updatedKeys = updateObject( state.newDocument, newKeys );

    const newValues = { values : state.newDocument.values.push("")}
    const updatedValues = updateObject( state.newDocument, newValues );

    const newCreds = updateObject( state.newDocument, {values_count: state.newDocument.values_count + 1} );

    const updatedState = {
        newDocument: newCreds
    }
    return updateObject( state, updatedState );
};

const setDataPoint = ( state, action , value ) => {
    const newData = state.newDocument.keys[action.index] = value
    const newKeys = { keys : newData}
    const updatedKeys = updateObject( state.newDocument, newKeys );

    const newValues = { values : state.newDocument.values.push("")}
    const updatedValues = updateObject( state.newDocument, newValues );

    const newCreds = updateObject( state.newDocument, {values_count: state.newDocument.values_count + 1} );

    const updatedState = {
        newDocument: newCreds
    }
    return updateObject( state, updatedState );
};


const deleteDataPoint = ( state, action ) => {
    
    const newKeys = { keys : state.newDocument.keys.splice(action.index)}
    const updatedKeys = updateObject( state.newDocument, newKeys );

    const newValues = { values : state.newDocument.values.splice(action.index)}
    const updatedValues = updateObject( state.newDocument, newValues );

    const newCreds = updateObject( state.newDocument, {values_count: state.newDocument.values_count - 1} );

    const updatedState = {
        newDocument: newCreds
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
        case actionTypes.CREATE_DOCUMENT_START: return createDocumentStart( state, action );
        case actionTypes.CREATE_DOCUMENT_SUCCESS: return createDocumentSuccess( state, action );
        case actionTypes.FETCH_DOCUMENTS_SUCCESS: return fetchDocumentsSuccess( state, action );
        case actionTypes.FETCH_DOCUMENTS_DONE: return fetchDocumentsDone( state, action );
        case actionTypes.INIT_DOCUMENTS: return initDocuments( state, action );
        case actionTypes.SIGN_DOCUMENT_SUCCESS: return signDocumentDone( state, action );


        
        default: return state;
    }
};

export default reducer;

