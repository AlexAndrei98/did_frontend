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
import { checkValidity } from "../../shared/validation";

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
        issued_to_hashed_key: {
            elementType: 'input',
                elementConfig: {
                    name: 'Hashed Key of the did',
                    type: 'text',
                    placeholder: 'did:ORG:{id}',
                    error: 'name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
        },
        issuer_to_public_key: {
            elementType: 'input',
                elementConfig: {
                    name: 'Public Key of the user',
                    type: 'text',
                    placeholder: 'did:ORG:{id}',
                    error: 'name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
        },
        issuer_to_date: {
            elementType: 'input',
                elementConfig: {
                    name: 'Today\'s Date',
                    type: 'text',
                    placeholder: Date(),
                    error: 'name'
                },
                value: '',
                validation: {
                    required: false,
                    // isIn : [
                    //     'alex','emilia'
                    // ]
                },
                valid: false,
                touched: false
        },
        issuer_to_type: {
            elementType: 'select',
                elementConfig: {
                    name: 'Type',
                    type: 'text',
                    options: [
                        {value:'ORG',
                        displayValue :'ORG'
                    },
                        {value:'PERSON',
                        displayValue :'PERSON'
                    }
                    ],
                    error: 'name'
                },
                value: '',
                validation: {
                    required: false,
                },
                
                valid: false,
                touched: false
        }
        // signed: false,
        // issuer_to_hashed_key : null,
        // issuer_to_public_key : null,
        // issuer_to_type: null,
        // issued_to_public_key : null,
        // issued_to_type : null,
        // issued_date : Date()
    });
    const [metadata, setMetadata] = useState({
        keys : ["",""],
        values: ["",""],
        values_count : 1
    });


    const createCredentialStart = ()  => dispatch(actions.createCredentialStart())
    const createCredentialSuccess = (value)  => dispatch(actions.createCredentialSuccess())
    
    

    let modalHandler
    let newCredentialForm = []
    for (let key in newCredential){
        newCredentialForm.push({
            key:key,
            config: newCredential[key]
        })
    }
    console.log(newCredentialForm)
    const inputChangedHandler = (event, controlName) => {
        console.log(controlName)
        const updatedCredentialForm = updateObject(newCredential, {
            [controlName]: updateObject(newCredential[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, 
                    newCredential[controlName].validation),
                touched: true
            })
        })
        console.log('updated cred on typing', updatedCredentialForm)
        setNewCredential(updatedCredentialForm);
    }

    let form = (newCredentialForm.map(formElement => (
        <Input
        key={formElement.key}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => inputChangedHandler(e, formElement.key)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/>
    )))

    // BEGINNING OF METADATA
    const addDataPoint = () => {
        const keys = metadata.keys
        keys.push("")
        const values = metadata.values
        values.push("")
        const trueMetadata = updateObject(metadata, 
            { keys : keys,
            values : values
        })
        setMetadata(trueMetadata)

    }
    const deleteDataPoint = (index) => {
        const keys = metadata.keys
        keys.splice(index,1)
        const values = metadata.values
        values.splice(index,1)
        const trueMetadata = updateObject(metadata, 
            { keys : keys,
            values : values
        })
        setMetadata(trueMetadata)
    }
    const setDataPoint = (idx, keyOrValue, inputValue) =>  {
        const newData = metadata[keyOrValue]
        newData[idx] = inputValue
        const trueMetadata = updateObject(metadata, { [keyOrValue] : newData})
        setMetadata(trueMetadata)
    }

    let  _values = []
    for (let i=0 ; i< metadata.keys.length ; i++){
        _values.push({
            'key':metadata.keys[i],
            'value' : metadata.values[i],
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
    // END OF METADATA

    return (
        <Aux>
            <button classes = {classes.button} onClick={createCredentialStart}>
                Create new credentials 
            </button>
            <Modal show={creating} close={modalHandler}>
                {form}
                {alert_text}
                {key_value_pair}
                <button onClick={createCredentialSuccess}> close </button>

            </Modal>
        </Aux>
    )

}
export default withErrorHandler(Credentials, axios);