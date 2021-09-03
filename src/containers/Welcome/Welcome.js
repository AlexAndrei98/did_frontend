import React, {useCallback, useEffect, useState} from "react";
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Welcome.module.css';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';
import words from "random-words"
import sha256 from "js-sha256"

const Welcome = () => {

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

        </div>
    )
}

export default Welcome;