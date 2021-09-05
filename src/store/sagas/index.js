import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import {logoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from "./burgerBuilder";
import {purchaseBurgerSaga, fetchOrdersSaga} from "./order";
import {signupUserSaga} from "./signup";
import {fetchDocumentsSaga, createDocumentSaga,signDocument} from "./documents"
import {fetchLikedDidsSaga, linkDidsSaga } from "./identities"
import {fetchWelcomeData } from "./welcome"


import * as actionTypes from './../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

export function* watchSignup() {
    yield takeEvery(actionTypes.SIGNUP_USER, signupUserSaga);
}
export function* watchDocuments() {
    yield takeEvery(actionTypes.FETCH_DOCUMENTS, fetchDocumentsSaga);
    yield takeEvery(actionTypes.CREATE_DOCUMENT, createDocumentSaga);
    yield takeEvery(actionTypes.SIGN_DOCUMENT, signDocument);

    
}
export function* watchDids() {
    yield takeEvery(actionTypes.FETCH_LINKED_DIDS, fetchLikedDidsSaga);
    yield takeEvery(actionTypes.LINK_DID, linkDidsSaga);

}
export function* watchWelcome() {
    yield takeEvery(actionTypes.FETCH_WELCOME_DATA, fetchWelcomeData);

}

