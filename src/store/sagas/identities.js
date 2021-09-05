
import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axiosAuth from "../../axios/axios-auth";
import axiosLink from "../../axios/axios-link";

import sha256 from "js-sha256"

export function* fetchLikedDidsSaga(action){
    
    
    let body = {"body":JSON.stringify({ hashed_key:sha256(action.name)})}
    yield put(actions.initDidsClean())
    let url= '/did_get'
    try {
        const response = yield axiosAuth.post(url, body)
        let data = JSON.parse(response.data.body)
        for (let key in data.linked_dids){
            let body1 = {"body":JSON.stringify({ hashed_key:key})}
            const response = yield axiosAuth.post(url, body1)
            let data1 = JSON.parse(response.data.body)

            yield put(actions.fetchLinkedDidsSuccess({
                name : data1.name, 
                publicKey : data1.public_key, 
                entityType: data1.entityType,
                status: data1.linked_dids[sha256(action.name)]
            }))
        }

        yield put(actions.didsDone())

    }
    catch (error) {
        console.log(error)
    }
}
 
export function* linkDidsSaga(action){

    let modifiedData = {"body":JSON.stringify( {
        'hashed_key': sha256(action.requesterHash),
        'did_to_link':action.hashedKey,
        'status':action.status
        })
        
    }
    yield console.log("modified data",modifiedData)

    let extended_url
    extended_url = '/did_link'
    try {
        const response = yield axiosLink.post(extended_url, modifiedData)
        let data = JSON.parse(response.data.body)
        yield put(actions.initDidsClean())
        yield put(actions.fetchLinkedDidsStart())
        console.log("response data",data)
        // yield put(actions.linkDidSuccess(data))
        yield put(actions.didsDone())


    }
    catch (error){
        console.log("response data",error)
    }

}