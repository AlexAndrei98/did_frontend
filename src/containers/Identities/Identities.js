import Table from 'rc-table';
import React, {useEffect, useState, useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from './../../components/UI/Modal/Modal';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector} from "react-redux";
import axios from '../../axios/axios-orders';
import * as actions from "../../store/actions";
import classes from './Identities.module.css';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";
import { sha256 } from 'js-sha256';

const Identities = () => {
    const dispatch = useDispatch();
    const hashedKey = useSelector(state => state.auth.name);
    const entityTypeUser = useSelector(state => state.auth.entityType);
    const entitypublicKey = useSelector(state => state.auth.publicKey);

    const identities = useSelector(state => state.dids.identities);
    const loading = useSelector(state => state.dids.loading);
    const onFetchLinkedDids = useCallback( ( hashedKey) => dispatch(actions.fetchIdentities(hashedKey)),[dispatch])
    const linkDid = useCallback( ( hashedKey,requesterHash, status) => dispatch(actions.linkDid(hashedKey,requesterHash,status)),[dispatch])
    
    const sign = (index) =>{
        //sets the value of the linked did to true for both users
        let requesterHash = sha256(identities[index].name)
        console.log(requesterHash)
        console.log(hashedKey)
        linkDid(requesterHash,hashedKey,'Link')
        onFetchLinkedDids(hashedKey)

    }

    const onChange = (e) => {
        setDidtoLink({didToLink :e.target.value}) 
    }
    


    useEffect( () => {
        // if (identities.length > 0) {
            // console.log("entityTypeUser",entityTypeUser)

            onFetchLinkedDids(hashedKey);
        // }
    }, [onFetchLinkedDids,hashedKey])

    const [didtoLink, setDidtoLink] = useState({didToLink: ''})

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 100,
        },
        {
            title: 'Public Key',
            dataIndex: 'publicKey',
            key: 'publicKey',
            width: 100,
            ellipsis: true   
        },
        {
            title: 'Entity Type',
            dataIndex: 'entityType',
            key: 'entityType',
            width: 100,
        },
        {
            title: 'Signed',
            dataIndex: '',
            key: 'signed',
            width: 100,
            render: ( value, row, index) => { 
                //look at line 45 in nthe linkDidsSaga
                console.log('columns render',entityTypeUser ,identities[index])
                if (identities[index]){
                    if(identities[index].status == 'Not Signed'){
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



    let table = <Spinner/>
    if (!loading){ 
        const data = []
        identities.map( e => {
            data.push({ name: e.name, entityType:e.entityType, publicKey: e.publicKey.slice(0,50)+'...' ,signed:e.status})
        })
    
        table = <Table scroll={{ x: true, y: true }}  columns={columns} data={data} tableLayout={'auto'} />
    }
    let linkDidComponnent = null
    if (entityTypeUser == 'ENTITY'){
        linkDidComponnent = (
        <div key={5}> 
            <input key={1} value={didtoLink.didToLink} placeholder='hash of the name' onChange= {(e) => onChange(e)}/>
            <button key={2} onClick={(e) => linkDid(didtoLink.didToLink, hashedKey, 'Not Signed')}>Link New DID</button>
            </div>)

    }
    


    return (
        <div className={classes.Identities } >
            {linkDidComponnent}
            <p key={3} >{hashedKey}</p>
            <p key={4} > <b>Secret ID</b> {sha256(hashedKey)}</p>
            <p key={5}  ><b>Public Key</b> {entitypublicKey.slice(30,100)}...</p>

            {table}
        </div>
    )

}

export default withErrorHandler(Identities, axios);