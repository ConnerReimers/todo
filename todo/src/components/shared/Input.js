import React, { useReducer, useEffect } from 'react'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: action.isValid
            };
        case 'TOUCHED':
            return {
                ...state,
                isTouched: true
            }
        default: 
            return state
    }
}

const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, 
        {
            isValid: props.isValid || false,
            value: props.value || '',
            isTouched: false,
        });

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])
    
    const inputChangeHandlr = (event) => {
        dispatch({type: 'CHANGE', val: event.target.value, isValid: true})
    }


    const element = props.element === 'input' 
        ? (
            <input 
                onChange={inputChangeHandlr}
                className={`form-input ${props.class}`}
                type={props.type}
                id={props.id}
                value={inputState.value}
                placeholder={props.label}
                
                />
        ) : (
            <select 
                className={`form-input ${props.class}`}
                onChange={inputChangeHandlr}
                value={inputState.value}

                id={props.id}
                >
                <option value="">How Urgent?</option>
                <option value="Important">Important</option>
                <option value="Medium">Medium Importance</option>
                <option value="Unimportant">Unimportant</option>

            </select>
        );

    return (
        <div className={`form-control`}>
            <label className={`form-label ${props.labelClass}`} htmlFor={props.id}>{props.line}</label>
            {element}
        </div>
    )
}

export default Input;
