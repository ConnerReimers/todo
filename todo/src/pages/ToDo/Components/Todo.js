import React, { useState, useContext, useEffect } from 'react'
import Input from '../../../components/shared/Input';
import './todo.css'
import { useForm } from '../../../hooks/forms-hook';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import { useParams } from 'react-router-dom';
import { uuid } from 'uuidv4';


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
const TodoBack = styled.div`
    height: 38vh;
    background-color: rgba(22, 163, 156, 0.034);

`
const Todo = () => {
    const auth = useContext(AuthContext)
    const userId = useParams().userId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try{
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/todo/${userId}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                console.log(response.todo)
                setTodos(response.todo)
            }catch(err) {}
        }
        fetchTodos();
    },[sendRequest, userId])

    const {formState, inputHandler} = useForm({
        task: '',
        urgency: 'Important',
        
    }, false);


    

    function deleteTodo(id) {
        console.log(id)
        let filteredTodo = todos.filter((todo) => {
            return todo.id !== id
        });
        setTodos(filteredTodo)
    };

    const submitHandlr = async event => {
        event.preventDefault();
        const taskNow = formState.inputs.task.value
        const urgencyNow = formState.inputs.urgency.value
        const todoTemplate = {
            task: taskNow,
            urgency: urgencyNow,
            creator: userId,
            id: uuid()
        }

        if(taskNow && urgencyNow) {
            setTodos(prevState => [...prevState, todoTemplate])
        }       
        let response;
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/todo', 'POST', 
            JSON.stringify({
                task: taskNow,
                urgency: urgencyNow,
                creator: userId

            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            
            });
            
            console.log(response)
        } catch (err) {

        }
    }

    

    return (
        <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransitions}
        style={{overflowX: "hidden"}}
        >

            <div className="contained">

                <form onSubmit={submitHandlr} className="todo-form">
                    <Input
                        onInput={inputHandler}                     
                        id="task"
                        element="input"
                        label="To Do Task..."
                        type="text"
                        line="Please enter the To Do task..."
                        labelClass="task-label"
                        />

                    <Input 
                        onInput={inputHandler}
                        id="urgency"
                        element="option"
                        label="How important is this task?"
                        line="How important is this task?"
                        />
                        

                    <button className="btn-submit Todo" type="submit"><span className="btn-content">SUBMIT</span></button>
                </form>
            </div>
            <TodoItem deleteHandlr={deleteTodo} list={todos}/>
            <TodoBack />

        </motion.div>
    )
}

export default Todo
