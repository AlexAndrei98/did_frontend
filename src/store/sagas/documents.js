import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axiosDocumentsCreate from "../../axios/axios-documents-create";
import sha256 from "js-sha256"
import axiosAuth from "../../axios/axios-auth";
import axiosDocumentsSign from "../../axios/axios-documents-sign";


export function* fetchDocumentsSaga(action){
    //fetch all of the documents for a given user
    
    // yield put(actions.fetchDocumentsStart())
    let body = {"body":JSON.stringify({ hashed_key:sha256(action.name)})}
    yield put(actions.initDidsClean())
    yield put(actions.initDocumentsClean())


    let url= '/did_get'
    try {
        const response = yield axiosAuth.post(url, body)
        let data = JSON.parse(response.data.body)
        
        for (let key in data.linked_dids){
            yield console.log(key)
            let body1 = {"body":JSON.stringify({ hashed_key:key})}
            const response = yield axiosAuth.post(url, body1)
            let data1 = JSON.parse(response.data.body)
            yield console.log('sub_data', data1)

            yield put(actions.fetchLinkedDidsSuccess({
                name : data1.name, 
                publicKey : data1.public_key, 
                entityType: data1.entityType,
                status: data1.linked_dids[sha256(action.name)]
            }))
        }
        for (let key in data.signed_credentials){
            let bodyCred = {"body":JSON.stringify({ hashed_key:key })}
            const response = yield axiosAuth.post(url, bodyCred)
            let dataCred = JSON.parse(response.data.body)
            let dataFinal = {
                hashed_key:dataCred.hashed_key,
                issuer_to_name: dataCred.issuer_to_name,
                issued_to_hashed_key: dataCred.issued_to_hashed_key,
                issued_to_public_key: dataCred.issued_to_public_key,
                issued_to_name : dataCred.issued_to_name,
                issued_to_type : dataCred.issued_to_type,
                issued_date: dataCred.issued_date,
                signed: dataCred.signed,
                issuer_to_hashed_key: dataCred.issuer_to_hashed_key,
                issuer_to_type : dataCred.issuer_to_type,
                more_data: dataCred.more_data
        }
        yield put(actions.fetchDocumentsSuccess(dataFinal))
        }
        
        yield put(actions.didsDone())

        yield put(actions.doneFetching())

        

    }
    catch (error) {
        console.log(error)
    }
}


export function* createDocumentSaga(action){
    //fetch all of the documents for a given user
    let payload = {"body":JSON.stringify(action.body)
    }

    let extended_url
    extended_url = '/credentials_create'
    try {
        const response = yield axiosDocumentsCreate.post(extended_url, payload)
        let data = JSON.parse(response.data.body)
        console.log("succesfully created documents response",data)
        yield put(actions.createDocumentSuccess())
        // yield put(actions.fetchDocuments())



    }
    catch (error){
        console.log("response data",error)
    }



}



export function* signDocument(action){

    let modifiedData = {"body":JSON.stringify( {
        'issuer_to_hashed_key': action.issuer_to_hashed_key,
        'issued_to_hashed_key':action.issued_to_hashed_key,
        'issued_date':action.issued_date
        })
        
    }
    yield console.log("modified data",modifiedData)

    let extended_url
    extended_url = '/credentials_sign'
    try {
        const response = yield axiosDocumentsSign.post(extended_url, modifiedData)
        let data = JSON.parse(response.data.body)
        
        yield put(actions.fetchLinkedDidsStart())
        console.log("response data",data)
        yield put(actions.linkDidSuccess(data))
        yield put(actions.didsDone())


    }
    
    catch (error){
        console.log("response data",error)
    }

}

export function* shareDocument(action){
    
}