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
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';

const Credentials = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector( state => {
        return state.auth.name 
    })
    //State and functions to load all of the credentials in a table
    const fetchCredentials = useCallback(() => dispatch(actions.fetchCredentialsStart()), [dispatch]);

    const creating = useSelector( state => {
        return state.credentials.creating
    })

    const newCredential = useSelector( state => {
        return state.credentials.newCredential
    })
    const keys = useSelector( state => {
        return state.credentials.newCredential.keys
    })

    const createCredentialStart = ()  => dispatch(actions.createCredentialStart())
    const createCredentialSuccess = (value)  => dispatch(actions.createCredentialSuccess())

    let modalHandler
    let table = <Table/>
    const  _values = []
    for (let i=0 ; i< keys.length ; i++){
        _values.push({
            'key':newCredential.keys[i],
            'value' : newCredential.values[i]
        })

    }
    console.log(_values)

    //iterate
    let key_value_pair = (_values.map ( el => (<div>
        {userName} is creating a new credential for 
        <input  placeholder={el.key}/>
        <input placeholder={el.value} />
        <button onClick={createCredentialSuccess}> ciao
        </button>
    </div>)))

    return (
        <Aux>
            <button classes = {classes.button} onClick={createCredentialStart}>
                Create new credentials 
            </button>
            <Modal show={creating} close={modalHandler}>
                {key_value_pair}
            </Modal>
            {table}
        </Aux>
    )

}
export default withErrorHandler(Credentials, axios);