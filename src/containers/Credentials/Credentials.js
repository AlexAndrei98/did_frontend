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
import { sha256 } from 'js-sha256';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const Credentials = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector( state => {return state.auth.name})
    const entityTypeUser = useSelector(state => state.auth.entityType);
    const publicKey = useSelector(state => state.auth.publicKey);

    const credentialsLoaded = useSelector(state => state.credentials.credentials);
    const fetching = useSelector(state => state.credentials.fetching);

    const signCredential = useCallback((issuer_to_hashed_key,issued_to_hashed_key,issued_date ) => dispatch(actions.signCredential(issuer_to_hashed_key, issued_to_hashed_key,issued_date)), [dispatch]);

    //State and functions to load all of the credentials in a table
    const fetchCredentials = useCallback((userName) => dispatch(actions.fetchCredentials(userName)), [dispatch]);
    useEffect( () => {
        // if (identities.length > 0) {
            // console.log("entityTypeUser",entityTypeUser)

            fetchCredentials(userName);
        // }
    }, [fetchCredentials,userName])

    const creating = useSelector( state => {
        return state.credentials.creating
    })
    let table= <Spinner/>

    const sign = (index) => {
        console.log(tableData[index])
        console.log(tableData[index].issuer_to_hashed_key, tableData[index].issued_to_hashed_key,tableData[index].issued_date)
        signCredential(tableData[index].issuer_to_hashed_key, tableData[index].issued_to_hashed_key,tableData[index].issued_date)

    }


    const columns = [
        {
          title: 'Public Key',
          dataIndex: 'issued_to_public_key',
          key: 'issued_to_public_key',
          width: 250,
        },
        {
            title: 'Hashed Key',
            dataIndex: 'issued_to_hashed_key',
            key: 'issued_to_hashed_key',
            width: 250,
        },
        {
            title: 'Entity Type',
            dataIndex: 'issued_to_type',
            key: 'issued_to_type',
            width: 250,
        },
        {
            title: 'Date Created',
            dataIndex: 'issued_date',
            key: 'issued_date',
            width: 250,
        },
        {
            title: 'Signed',
            dataIndex: '',
            key: 'signed',
            render: ( value, row, index) => { 
                // look at line 45 in nthe linkDidsSaga
                console.log('columns render',entityTypeUser ,credentialsLoaded[index])
                if (credentialsLoaded[index]){
                    if(credentialsLoaded[index].signed == 'False'){
                            if (entityTypeUser == 'PERSON'){
                                return <a href="#" onClick={() => sign(index)} > Secure this Connection </a>
                            }
                        else{
                            return <p>Not signed</p>
                        }
                    }
                    else { 
                        return  <p> Signed</p> 
                    } 
                }
                else {
                    return  <p> Waiting</p>
                }
            },
        },
    ]

    let tableData = []
    credentialsLoaded.map(e => {
        tableData.push({
            issued_to_public_key: e.issued_to_public_key,
            issued_to_hashed_key:e.issued_to_hashed_key,
            issued_to_type: e.issued_to_type,
            issued_date: e.issued_date,
            signed: e.signed,
            issuer_to_type: e.issuer_to_type,
            issuer_to_public_key: e.issuer_to_public_key,
            issuer_to_hashed_key: e.issuer_to_hashed_key,
            children: e.more_data,
        })
    })
    const [expandRowByClick, expandRowByClickProps] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

    const onExpand = (expanded, record) => {
        console.log('onExpand', expanded, record.record.issued_date);
        let index = expandedRowKeys.indexOf(record.record.issued_date)
        if (index>-1){
            const newData = expandedRowKeys.slice();
            newData.splice(index, 1);

            setExpandedRowKeys(newData)
        }
        else {
            setExpandedRowKeys([record.record.issued_date])

        }
      };
    
      const onExpandedRowsChange = (rows) => {
        setExpandedRowKeys(rows);
      };
    
      const rowExpandable = (record) => true;
    


    if (fetching){
        table= <Table columns={columns} 
        rowKey='issued_date'
        expandable={{
            expandRowByClick,
            expandedRowRender: (record, index, indent, expanded) =>
              expanded ? (Object.entries(record.children).map(([key, value], i) => {
                return (
                    <div key={key}>
                        {key}: {value}
                    </div>
                )
            })) : null,
            expandedRowKeys,
            // onExpandedRowsChange,
            rowExpandable,
            expandIcon: (record) => {return (<a onClick={(e) => {onExpand(e, record)}} > more info</a>)},
            expandIconColumnIndex:null
          }} 
          data={tableData} />
    }
    console.log('fetching',fetching)
    const didsLinked = useSelector(state => state.dids.identities);
    const optionsDids = [{value:''}]

    const updateNewCredentials = () => {
        didsLinked.map(el => {
            optionsDids.push({value:el.name, displayValue : el.name, publicKey : el.publicKey})
        })

    }
    didsLinked.map(el => {
        optionsDids.push({value:el.name, displayValue : el.name, publicKey : el.publicKey})
    })
    
    const updateNewCredentialsNew = () => {
        updateNewCredentials()
        const updatedCredentialForm = updateObject(newCredential, {
            issued_to_hashed_key : updateObject(newCredential.issued_to_hashed_key, {
                elementConfig: updateObject(newCredential.issued_to_hashed_key.elementConfig, {
                    options: optionsDids
                })
            })
        })
        setNewCredential(updatedCredentialForm);
    }

    const [newCredential, setNewCredential] = useState({
        issued_to_hashed_key: {
            elementType: 'select',
                elementConfig: {
                    name: 'Name of the user',
                    type: 'text',
                    options: optionsDids,
                    error: 'name'
                },
                value: optionsDids[0].value,
                validation: {
                    required: false,
                },
                
                valid: false,
                touched: false
        },
        issued_to_date: {
            elementType: 'input',
                elementConfig: {
                    name: 'Today\'s Date',
                    type: 'timestamp',
                    placeholder: Date(),
                    error: 'name'
                },
                value: Date(),
                validation: {
                    required: false,
                    // isIn : [
                    //     'alex','emilia'
                    // ]
                },
                valid: false,
                touched: false
        },
        issued_to_type: {
            elementType: 'select',
                elementConfig: {
                    name: 'Type',
                    type: 'text',
                    options: [
                        {value:'PROPERTY TITLE',
                        displayValue :'PROPERTY TITLE'
                    },
                        {value:'DRIVER LICENSE',
                        displayValue :'DRIVER LICENSE'
                    }
                    ],
                    error: 'Type'
                },
                value: 'PROPERTY TITLE',
                validation: {
                    required: true,
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
    const createCredential = (value)  => dispatch(actions.createCredential(value))

    const startCredential = () => {
        updateNewCredentialsNew()
        createCredentialStart()
        console.log('optionsDids',optionsDids)
    }
    const createRequest = () => {


        var result = {};
        metadata.keys.forEach((key, i) => result[key] = metadata.values[i]);

        let body = {
            issuer_to_hashed_key : sha256(userName),
            issuer_to_type : entityTypeUser,
            issuer_to_public_key : publicKey,
            issued_to_hashed_key: sha256(newCredential.issued_to_hashed_key.value),
            issued_to_type: newCredential.issued_to_type.value ,
            issued_to_public_key: optionsDids.filter(el => el.value == newCredential.issued_to_hashed_key.value)[0].publicKey ,
            issued_date: newCredential.issued_to_date.value,
            signed:'False',
            more_data: result
        }
        console.log('body',body)
        
        createCredential(body)
        fetchCredentials(userName)
    }
    //issuer_to_ fields: userName, entityTypeUser, entityTypePublicKey 
    // issued_to fields: newCredential.issued_to_hashed_key.value, newCredential.issued_to_type.value , newCredential.issued_date.value 
    // optionsDids.filter(e => el.name ==  newCredential.issued_to_hashed_key.value).publicKey 
    
    

    let modalHandler
    let newCredentialForm = []
    for (let key in newCredential){
        newCredentialForm.push({
            key:key,
            config: newCredential[key]
        })
    }
    const inputChangedHandler = (event, controlName) => {
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
        <div className={classes.Credentials}>
            <Aux>
                {table}

                <button classes = {classes.button} onClick={startCredential}>
                    Create new credentials 
                </button>
                <Modal show={creating} close={modalHandler}>
                    {form}
                    {alert_text}
                    {key_value_pair}
                    <button onClick={createRequest}> close </button>

                </Modal>
            </Aux>
        </div>
    )

}
export default withErrorHandler(Credentials, axios);