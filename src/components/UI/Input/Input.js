import { string } from "prop-types";
import React from "react";
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    const inputClasses = [classes.InputElement];
    let validationError;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement =
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
    }
    let capitalize = (string) => {return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();}
    return (
        <div className={classes.Input}>
            <h3 className={classes.Label}>{capitalize(props.elementConfig.error)}</h3>
            <label className={classes.LabelElement}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}

export default input;


