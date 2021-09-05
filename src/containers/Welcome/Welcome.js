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
            width: 100,
        },
        {
            title: 'Holder Name',
            dataIndex: 'issued_to_name',
            key: 'issued_to_name',
            width: 100,
        },
      {
          title: 'Document Type',
          dataIndex: 'issued_to_type',
          key: 'issued_to_type',
          width: 100,
      },
      {
          title: 'Date Created',
          dataIndex: 'issued_date',
          key: 'issued_date',
          width: 100,
      },
      {
          title: 'Signed',
          dataIndex: 'signed',
          key: 'signed',
          width: 100,
      }
    ]
    if(!fetching){
        console.log(data)
        table = <Table data={data} columns={columns} style={{'width': '100%', 'text-align': 'center'}} emptyText={() => <h2>No Public Records Found</h2>  }/>
    
    }

    return (
        <div className={classes.Welcome}>
            <h1> Decentralized Identities and Verified Documents Managment for Citizens and Governments</h1> 
            <h2>How it works:</h2>
            Sign up for a wallet with either type of <b>ENTITY</b> or <b>PERSON</b>
            <br/>
            - as an ENTITY 
            <br/>
            You can initiate a secure connection with a PERSON given
            their secret ID where you can issue documents.
            <br/>
            You can issue a verified documents that can be confirmed by the other party that has a secure connection.
            <br/>
            - as a PERSON 
            <br/>
            You can approve a secure connection with a given ENTITY.
            <br/>
            You can see the different verified documents issued to you and approve them.
            <br/>
            <h2> Benefits</h2>
            <h3>Time efficency</h3>
            This platform allows goverment employees to handle and store goverment procedures and data.
            <h3>Transperency</h3>
            It allows citizens also to have full visibility in what is happening with their goverment and control over their data.
            <h1> Public Data Available below</h1> 
            {table}
        </div>
    )
}

export default withErrorHandler(Welcome, axiosAuth);