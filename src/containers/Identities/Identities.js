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

const Identities = () => {
    const dispatch = useDispatch();
    const hashedKey = useSelector(state => state.auth.name);
    const identities = useSelector(state => state.dids.identities);
    const loading = useSelector(state => state.dids.loading);
    const onFetchLinkedDids = useCallback( ( hashedKey) => dispatch(actions.fetchIdentities(hashedKey)),[dispatch])
    const linkDid = useCallback( ( hashedKey,requesterHash) => dispatch(actions.linkDid(hashedKey,requesterHash,'False')),[dispatch])
    
    const onChange = (e) => {
        console.log(identities)
        setDidtoLink({didToLink :e.target.value}) }
    useEffect( () => {
        onFetchLinkedDids(hashedKey);
    }, [onFetchLinkedDids,hashedKey])

    const [didtoLink, setDidtoLink] = useState({didToLink: ''})
    let dids_to_show = <Spinner/>
    if (loading){
    dids_to_show = ( identities.map(identity => (
        <p key= {identity.name}> {identity.name}</p>
    )))
    }
    


    return (
        <div className={classes.Identities}>
            <input key={1} value={didtoLink.didToLink} placeholder='hash of the name' onChange= {(e) => onChange(e)}/>
            <button key={2} onClick={(e) => linkDid(didtoLink.didToLink,hashedKey)}>Link New DID</button>
            <p key={3} >{hashedKey}</p>
            {dids_to_show}
        </div>
    )

}

export default withErrorHandler(Identities, axios);