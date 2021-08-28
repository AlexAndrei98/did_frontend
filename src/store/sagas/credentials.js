import { put, delay, call } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-auth";
import sha256 from "js-sha256"


export function* fetchCredentials(action){
    //fetch all of the credentials for a given user
    let hashed_id = sha256(action.name)
    let fetechedCredentials
    yield actions.fetchCredentialsSuccess(fetechedCredentials)

}