import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-signup";
import sha256 from "js-sha256"
import keypair from 'keypair'

export function* signupUserSaga(action) {
    yield put(actions.signupStart());
    const signupData = {
        name: action.name,
        password: action.password,
        entityType: action.entityType,
        seed: action.seed
    }
    let pair = keypair()
    let modifiedData = {"body":JSON.stringify({
        'hashed_key': sha256(action.name), 
        'public_key': pair.public, 
        'private_key': pair.private, 
        'name': signupData.name, 
        'entityType': signupData.entityType, 
        'password': sha256(action.password),
        'seed_phrase': action.seed.split(" "), 
        'signed_documents' :{},
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