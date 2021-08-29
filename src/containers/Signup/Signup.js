import React, {useCallback, useEffect, useState} from "react";
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Signup.module.css';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';
import words from "random-words"
import sha256 from "js-sha256"
const Signup = () => {
    let cypher_words = words({ min: 5, max: 5 ,join: ' '})

    const [signupForm, setSignupForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                name: 'name',
                type: 'text',
                placeholder: 'Your Name',
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
        password: {
            elementType: 'input',
            elementConfig: {
                name: 'password',
                type: 'password',
                placeholder: 'Your Password',
                error: 'password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        entityType: {
            elementType: 'input',
            elementConfig: {
                name: 'Entity Type',
                type: 'text',
                placeholder: 'Your Entity Type',
                error: 'type'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        seed: {
            elementType: 'input',
            elementConfig: {
                name: 'Seed phrase',
                type: 'text',
                placeholder: cypher_words,
                error: 'seed'
            },
            value: cypher_words,
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const loading = useSelector(state => state.signup.loading);
    const error = useSelector(state => state.signup.error);
    const isSignupenticated = useSelector(state => state.signup.hashedKey != null);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const dispatch = useDispatch();

    const onSignup = (name, password, type, seed) => dispatch(actions.signup(name, password, type, seed ));
    const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/')), [dispatch]);

    useEffect( () => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath])


    const inputChangedHandler = (event, controlName) => {
        const updatedSignupForm = updateObject(signupForm, {
            [controlName]: updateObject(signupForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, 
                                    signupForm[controlName].validation),
                touched: true
            })
        })

        setSignupForm(updatedSignupForm);
    }

    const submitSignup = (event) => {
        event.preventDefault();
        onSignup(signupForm.name.value, 
                signupForm.password.value,
                signupForm.entityType.value,
                signupForm.seed.value)
    }

    const formElementsArray = [];
    for (let key in signupForm) {
        formElementsArray.push({
            id: key,
            config: signupForm[key]
        })
    }

    let form = (formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => inputChangedHandler(e, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.value}/>
        ))
    )

    if (loading) {
        form = <Spinner/>
    }

    let errorMessage
    if(error) {
        if(error.message === "EMAIL_NOT_FOUND") {
            errorMessage = "This email doesn't exist in the base."
        } else if (error.message === "INVALID_PASSWORD" ||
            error.message === "MISSING_PASSWORD") {
            errorMessage = "The password is invalid."
        } else if (error.message === "USER_DISABLED") {
            errorMessage = "The user account has been disabled by an administrator."
        } else if (error.message === "EMAIL_EXISTS") {
            errorMessage = "The email address is already in use by another account."
        } else if (error.message === "INVALID_EMAIL") {
            errorMessage = "The email address is badly formatted."
        }
        else {
            errorMessage = error
        }
    }
    let authRedirect = null;
    if (isSignupenticated) {
        authRedirect = <Redirect to={authRedirectPath}/>
    }

    return (
        <div className={classes.Signup}>
            {authRedirect}
            <p>{errorMessage}</p>
            <form onSubmit={submitSignup}>
                {form}
                <Button btnType='Success'>Sign Up</Button>
            </form>
        </div>
    )
}

export default Signup;