import React, { useState, useContext, useCallback, Fragment } from 'react'
import Input from '../../components/shared/Input'
import { useForm } from '../../hooks/forms-hook'
import './auth.css';
import { motion } from 'framer-motion';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../../components/shared/Modal/ErrorModal';
import '../ToDo/Components/todo.css'

const pageVariants = {
    initial: {
        opacity: 0,
        x: '-100vw',
        scale: 0.8,

    },
    in: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: 0,
      y: '-100%',
      scale: 0.8

    }
  }

const pageTransitions = {
    type: 'spring',
    stiffness: 150,
    velocity: 1,
    damping: 100,
    mass: 1,
    restSpeed: 0.3,
    restDelta: 1.5


}



const Auth = (props) => {
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const histroy = useHistory();

    const {formState, inputHandler, setData} = useForm({
        email: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        }
    }, true);

    const switchModeHandlr = () => {
        if(!isOnLogin) {
            setData({
                ...formState.inputs,
                name: undefined
            })
        } else {
            setData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: true
                }
            })
        }

        setIsOnLogin(prevMode => !prevMode)
    }

    const submitAuthHandlr = async (event) => {
        event.preventDefault();
        if (isOnLogin) {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/login', 'POST', 
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,

                }),
                {'Content-Type': 'application/json'}
                );
                console.log(responseData)
                histroy.push('/')
                auth.login(responseData.userId, responseData.name, responseData.token)


            } catch (err) {}
        } else {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/signup', 'POST', 
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,

                }),
                {'Content-Type': 'application/json'}
                )
                console.log(responseData)


                histroy.push('/')
                auth.login(responseData.userId, responseData.name, responseData.token)
     

            } catch (err) {}
        }
    }

    const [isOnLogin, setIsOnLogin] = useState(true)
    let loginSignupWord = isOnLogin ? (<h1>Login!</h1>) : (<h1>Signup!</h1>)


    let formInputs = isOnLogin 
    ? (
    <form onSubmit={submitAuthHandlr} className="auth-form">
        {loginSignupWord}
        <Input 
            type="text"
            element="input"
            id="email"
            line="Email"
            label="Email"
            onInput={inputHandler}
            />
        <Input 
            type="text"
            element="input"
            id="password"
            line="Password"
            label="Password"
            onInput={inputHandler}
            />
<div  className="btn-container">
            <button className="btn-submit2 authSubmit" type="submit"><span className="btn-content">SUBMIT</span></button>
            <span className="btn-submit2 switchBtn" onClick={switchModeHandlr}><span className="btn-content swch">Switch</span></span>
        </div>
    </form>)
    : (
    <form onSubmit={submitAuthHandlr} className="auth-form">
        {loginSignupWord}
        
        <Input 
            type="text"
            element="input"
            id="name"
            line="name"
            label="name"
            onInput={inputHandler}
            />
        <Input 
            type="text"
            element="input"
            id="email"
            line="Email"
            label="Email"
            onInput={inputHandler}
            />
        <Input 
            type="text"
            element="input"
            id="password"
            line="Password"
            label="Password"
            onInput={inputHandler}
            />
        <div className="btn-container">
            <button className="btn-submit2 authSubmit" type="submit"><span className="btn-content">SUBMIT</span></button>
            <span className="btn-submit2 switchBtn" onClick={switchModeHandlr}><span className="btn-content swch">Switch</span></span>
        </div>
    </form>
    );

    

    

    return (
        <Fragment>
            <ErrorModal error={error} clearError={clearError}/>
            <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransitions}
            className="contained helped">
                
                
                {formInputs}

            </motion.div>
        </Fragment>
    )
} 

export default Auth
