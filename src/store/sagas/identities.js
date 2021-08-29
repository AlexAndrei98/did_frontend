
import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axiosAuth from "../../axios/axios-auth";
import axiosLink from "../../axios/axios-link";

import sha256 from "js-sha256"

export function* fetchLikedDidsSaga(action){
    
    
    let body = {"body":JSON.stringify({ hashed_key:sha256(action.name)})}
    let url= '/did_get'
    try {
        const response = yield axiosAuth.post(url, body)
        let data = JSON.parse(response.data.body)
        for (let key in data.linked_dids){
            console.log(key)
            let body1 = {"body":JSON.stringify({ hashed_key:key})}
            const response = yield axiosAuth.post(url, body1)
            let data1 = JSON.parse(response.data.body)
            console.log('sub_data', data1)

            yield put(actions.createIdentitiesSuccess({ name:data1.name}))
        }
        yield put(actions.createIdentitiesStart())

    }
    catch (error) {
        console.log(error)
    }


    

}
 
export function* linkDidsSaga(action){

    let modifiedData = {"body":JSON.stringify( {
        'hashed_key': sha256(action.requesterHash),
        'did_to_link':action.hashedKey,
        'status':'homer'
        })
        
    }
    let extended_url
    extended_url = '/did_link'
    try {
        const response = yield axiosLink.post(extended_url, modifiedData)
        let data = JSON.parse(response.data.body)
        

        console.log("response data",data.name)
        yield put(actions.createIdentitiesSuccess(data))


    }
    catch (error){
        console.log("response data",error)
    }

}