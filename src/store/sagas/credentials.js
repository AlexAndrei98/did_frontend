import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axiosCredentialsCreate from "../../axios/axios-credentials-create";
import sha256 from "js-sha256"
import axiosAuth from "../../axios/axios-auth";


export function* fetchCredentialsSaga(action){
    //fetch all of the credentials for a given user
    
    // yield put(actions.fetchCredentialsStart())
    let body = {"body":JSON.stringify({ hashed_key:sha256(action.name)})}
    yield put(actions.initDidsClean())
    yield put(actions.initCredentialsClean())


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
                issued_to_public_key: dataCred.issued_to_public_key,
                issued_to_hashed_key : dataCred.issued_to_hashed_key,
                issued_to_type : dataCred.issued_to_type,
                issued_date: dataCred.issued_date,
                signed: dataCred.signed,
                more_data: dataCred.more_data
            }
            yield put(actions.fetchCredentialsSuccess(dataFinal))
        }
        yield put(actions.doneFetching())

        

    }
    catch (error) {
        console.log(error)
    }
}


export function* createCredentialSaga(action){
    //fetch all of the credentials for a given user
    let payload = {"body":JSON.stringify(action.body)
    }

    let extended_url
    extended_url = '/credentials_create'
    try {
        const response = yield axiosCredentialsCreate.post(extended_url, payload)
        let data = JSON.parse(response.data.body)
        console.log("succesfully created credentials response",data)
        yield put(actions.createCredentialSuccess())
        // yield put(actions.fetchCredentials())



    }
    catch (error){
        console.log("response data",error)
    }



}

