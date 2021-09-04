import React, {useCallback, useEffect, useState} from "react";
import Table from 'rc-table';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Welcome.module.css';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosAuth from "../../axios/axios-auth";
import { updateObject } from "../../shared/utility";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';
import words from "random-words"
import sha256 from "js-sha256"

const Welcome = () => {

    const dispatch = useDispatch();

    const fetching = useSelector(state => state.welcome.fetching);
    const data = useSelector(state => state.welcome.data);
    const error = useSelector(state => state.welcome.error);


    const fetchAllPublicData = useCallback( ( ) => dispatch(actions.fetchPublicData()),[dispatch])
    useEffect( () => {
        // if (identities.length > 0) {
            // console.log("entityTypeUser",entityTypeUser)

            fetchAllPublicData();
        // }
    }, [fetchAllPublicData])

    let table = <Spinner/>
    let columns = [        
        {
            title: 'Issuer Name',
            dataIndex: 'issuer_to_name',
            key: 'issuer_to_name',
            width: 250,
        },
        {
            title: 'Holder Name',
            dataIndex: 'issued_to_name',
            key: 'issued_to_name',
            width: 250,
        },
      {
          title: 'Credential Type',
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
          dataIndex: 'signed',
          key: 'signed',
          width: 250,
      }
    ]
    if(!fetching){
        console.log(data)
        table = <Table data={data} columns={columns}/>
    
    }

    return (
        <div className={classes.Welcome}>
            Welcome to Dids and Verified Credentials
            <br/>
            How it works:
            Sign up for a wallet with either type of ENTITY or PERSON
            <br/>
            - as an ENTITY you can initiate a secure channel with a PERSON given
            their ID where you can issue credentials.
            <br/>
            After you sign up as an entity you can link to an existing did
            After a did channel has been secure by the other party you can issue credentials.
            Finally you can issue a verified credential that can be confirmed by the other party.
            <br/>
            - as a PERSON you can confirm and initiate different transactions.
            <br/>
            After logging in you can see the different secure channels 
            that wannt to conenct or are connected with you 
            and you can secure a channel that an ENTITY can initiate.
            <br/>
            Finally you can see the different crendetials issued to you and sign them.
            {table}
        </div>
    )
}

export default withErrorHandler(Welcome, axiosAuth);