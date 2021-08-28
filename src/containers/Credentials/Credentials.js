import Table from 'rc-table';
import React, {useEffect, useState, useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from './../../components/UI/Modal/Modal';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector} from "react-redux";
import axios from '../../axios/axios-orders';
import * as actions from '../../store/actions/index';
import classes from './Credentials.module.css';


const Credentials = (props) => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector( state => {
        return state.auth.name != null
    })
    //State and functions to load all of the credentials in a table
    const fetchCredentials = useCallback(() => dispatch(actions.fetchCredentialsStart()), [dispatch]);

    const creating = useSelector( state => {
        return state.credentials.creating
    })

    const newCredential = useSelector( state => {
        return state.credentials.newCredential
    })
    console.log(newCredential)

    const createCredentialStart = ()  => dispatch(actions.createCredentialStart())

    let modalHandler
    let table = <Table/>

    return (
        <Aux>
            <button classes = {classes.button} onClick={createCredentialStart}>
                Create new credentials 
            </button>
            <Modal show={creating} close={modalHandler}>
                {newCredential.issued_date}
            </Modal>
            {table}
        </Aux>
    )

}
export default withErrorHandler(Credentials, axios);