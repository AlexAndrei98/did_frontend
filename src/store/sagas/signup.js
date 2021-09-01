import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-signup";
import sha256 from "js-sha256"


export function* signupUserSaga(action) {
    yield put(actions.signupStart());
    const signupData = {
        name: action.name,
        password: action.password,
        entityType: action.entityType,
        seed: action.seed
    }
    console.log(action)
    let modifiedData = {"body":JSON.stringify({
        'hashed_key': sha256(action.name), 
        'public_key': '--BEGIN PUBLIC KEY ----- 324nk6jk4n6k453yh34b5hj', 
        'private_key': '--BEGIN PRIVATE KEY ----- nvjks34ktn4j2tn4h2baa', 
        'name': signupData.name, 
        'entityType': signupData.entityType, 
        'password': sha256(action.password),
        'seed_phrase': action.seed.split(" "), 
        'signed_credentials' :{},
        'linked_dids': {}        
        })
    }
    let extended_url;
    extended_url ='/did_create'
    try {
        const response = yield axios.post(extended_url, modifiedData)
        const data = JSON.parse(response.data.body)
        console.log("response data",data)
        /*this lines set the  state.signup.token and state.signup.hashedKey*/ 
        yield put(actions.authSuccess(data.name, data.password,data.entityType,data.public_key))
    } catch (error) {
        yield put(actions.signupFail(error.response))
    }
}