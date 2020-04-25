import { useReducer, useCallback } from "react"


const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if(!state.inputs[inputId]) {
                    continue
                }
            }
            
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        case 'SET_DATA':
            return {
                ...state,
                inputs: action.inputs,
                isValid: action.isValid
            }
        default:
            return state
    }
}

export const useForm = (initialInputs, initialFormValiditity) => {

    const [formState, dispatch] = useReducer(formReducer,
        {
            inputs: initialInputs,
            isValid: initialFormValiditity

        });

    const setData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            isValid: formValidity

        })
    }, [])

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', inputId: id, value: value, isValid})
    }, [])

    
    return {formState, inputHandler, setData};
};