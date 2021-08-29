import { put } from 'redux-saga/effects';
import * as actions from './../actions/index';
import axios from "../../axios/axios-orders";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.data)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.data));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="hashedKey"&equalTo="' + action.hashedKey + '"'
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        console.log(error)
        yield put(actions.fetchOrdersFail(error));
    }
}