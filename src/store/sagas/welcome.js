import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axiosAuth from "../../axios/axios-auth";
import sha256 from "js-sha256"


export function* fetchWelcomeData(action){
    let body = {"body":JSON.stringify({ hashed_key:'all_credentials'})}
    yield put(actions.cleanWelcomeData())

    let url= '/did_get'
    try {
        let temp_data = []
        const all_creds = yield axiosAuth.post(url, body)
        let data = JSON.parse(all_creds.data.body)
        yield console.log(data.all_cred_ids)
        for (let key in data.all_cred_ids){

            let body1 = {"body":JSON.stringify({ hashed_key: data.all_cred_ids[key]})}
            const response = yield axiosAuth.post(url, body1)
            let _data = JSON.parse(response.data.body)
            yield console.log(_data)

            temp_data.push(_data)
        }
        yield put(actions.setWelcomeData(temp_data))

    }


    catch (error) {
        yield put(actions.setWelcomeError(error))

        console.log(error)
    }
}

