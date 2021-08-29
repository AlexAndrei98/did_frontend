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
import { updateObject } from "../../shared/utility";

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

    const [newCredential, setNewCredential] = useState({
        issued_to_name: null,
        signed: false,
        issuer_to_hashed_key : null,
        issuer_to_public_key : null,
        issuer_to_type: null,
        issued_to_hashed_key : null,
        issued_to_public_key : null,
        issued_to_type : null,
        issued_date : Date(),
        values_count : 1,
        keys : ["",""],
        values: ["",""]
    });


    const createCredentialStart = ()  => dispatch(actions.createCredentialStart())
    const createCredentialSuccess = (value)  => dispatch(actions.createCredentialSuccess())
    
    const addDataPoint = () => {
        const keys = newCredential.keys
        keys.push("")
        const values = newCredential.values
        values.push("")
        const trueNewCredential = updateObject(newCredential, 
            { keys : keys,
            values : values
        })
        console.log(trueNewCredential)
        setNewCredential(trueNewCredential)

    }
    const deleteDataPoint = (index) => {
        console.log(index)
        const keys = newCredential.keys
        keys.splice(index,1)
        const values = newCredential.values
        values.splice(index,1)
        const trueNewCredential = updateObject(newCredential, 
            { keys : keys,
            values : values
        })
        console.log(trueNewCredential)
        setNewCredential(trueNewCredential)
    }
    const setDataPoint = (idx, keyOrValue, inputValue) =>  {
        const newData = newCredential[keyOrValue]
        newData[idx] = inputValue
        const trueNewCredential = updateObject(newCredential, { [keyOrValue] : newData})
        setNewCredential(trueNewCredential)
    }

    let modalHandler
    let table = <Table/>
    let  _values = []
    for (let i=0 ; i< newCredential.keys.length ; i++){
        _values.push({
            'key':newCredential.keys[i],
            'value' : newCredential.values[i],
            'index': i
        })

    }
    let alert_text 
    if (_values.length <1) {
        alert_text = <div>
            Must have at least one metadata point
            <button onClick={addDataPoint}> add more </button>
        </div>
    }
    console.log(newCredential)
    console.log(_values)

    //iterate
    let key_value_pair = (_values.map ( el => (<div>
        {userName} Data points  for {el.index} 
        <br/>
        key: {el.key}  value: {el.value}
        <br/>
        <button onClick={(e) => deleteDataPoint(el.index)}> delete elemente 
        </button>
        <input value={el.key} onChange={ (e) => setDataPoint(el.index,"keys",e.target.value)}/>
        <input value={el.value} onChange={ (e) => setDataPoint(el.index,"values",e.target.value)}/>    
        <button onClick={addDataPoint}> add more </button>
    </div>)))

    return (
        <Aux>
            <button classes = {classes.button} onClick={createCredentialStart}>
                Create new credentials 
            </button>
            <Modal show={creating} close={modalHandler}>
                {alert_text}
                {key_value_pair}
                <button onClick={createCredentialSuccess}> close </button>

            </Modal>
            {table}
        </Aux>
    )

}
export default withErrorHandler(Credentials, axios);