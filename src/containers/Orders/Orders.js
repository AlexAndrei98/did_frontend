import React, {useCallback, useEffect} from "react";
import Order from './../../components/Order/Order'
import axios from '../../axios/axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {useSelector, useDispatch} from "react-redux";
import * as orderActions from "../../store/actions";
import Spinner from './../../components/UI/Spinner/Spinner'

const Orders = () => {

    const dispatch = useDispatch();
    const onFetchOrders = useCallback( (token, hashedKey) => dispatch(orderActions.fetchOrders(token, hashedKey)),[dispatch])

    const orders = useSelector(state => state.order.orders);
    const loading = useSelector(state => state.order.loading);
    const token = useSelector(state => state.auth.name);
    const hashedKey = useSelector(state => state.auth.hashedKey);

    useEffect( () => {
        onFetchOrders(token, hashedKey);
    }, [onFetchOrders, token, hashedKey])

    let allOrders = <Spinner />;
    if(!loading) {
        allOrders = orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            )
        )
    }

    return (
        <div>
            {allOrders}
        </div>
    );
}

export default withErrorHandler(Orders, axios);